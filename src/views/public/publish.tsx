import * as React from "react";
import { Toaster } from "../../components/ui/toaster.tsx";
import { useToast } from "../../hooks/use-toast.ts";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

import { NavBarReturn } from "../../components/navbar";
import { Card, CardContent, CardHeader } from "../../components/ui/card";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";

import {
  IncognitoSolid,
  EarthSolid,
  TrashOneSolid,
  LocationSelectedSolid,
  ChevronRight,
  AlbumSolid,
} from "@mynaui/icons-react";

import { getStatusUser } from "../../utils/getStatusUser.tsx";

import PostingArt from "../../../public/images/posting_art.png";

interface CardData {
  content: string;
  isAnonymous: boolean;
  photoURLs?: string;
  videoURLs?: string[];
  userPhotoUrls?: string;
  mentionedUsers: string[];
}

interface Location {
  center: [number, number];
  place_name: string;
}

interface SelectedLocation {
  name: string;
  coordinates: [number, number];
}

const LogoLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src={PostingArt}
        className="hidden md:flex md:h-[300px] md:w-[300px]"
      />
    </div>
  );
};

const PublishLayout = () => {
  const { toast } = useToast();

  const [userId] = React.useState<string | null>(
    localStorage.getItem("userId")
  );

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} às ${currentDate.toLocaleTimeString()}`;

  const [isAnonymous, setAnonymous] = React.useState<boolean>(false);

  const [cardData, setCardData] = React.useState<CardData>({
    content: "",
    isAnonymous: false,
    mentionedUsers: [],
  });
  console.log(cardData);
  
  interface Images {
    type: string;
    src: string;
  }
  const [images, setImages] = React.useState<Images[]>([]);
  const [uploadedImages, setUploadedImages] = React.useState<File[]>([]);

  const handleIsAnonymous = () => {
    setAnonymous(!isAnonymous);
  };

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "content") {
      const mentionedUsers =
        value.match(/@(\w+)/g)?.map((user) => user.slice(1)) || [];
      setCardData((prevData) => ({
        ...prevData,
        [name]: value,
        mentionedUsers: mentionedUsers,
      }));
    } else {
      setCardData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const maxFiles = 5;
      if (uploadedImages.length + files.length > maxFiles) {
        toast({
          variant: "danger",
          title: "Notificação",
          description: `Você pode fazer upload de até ${maxFiles} imagens no total, ${formattedDate}`,
        });
        return;
      }

      const newImages = files.map((file) => {
        return {
          src: URL.createObjectURL(file),
          type: file.type,
        };
      });

      setUploadedImages((prev) => [...prev, ...files]);
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  React.useEffect(() => {
    setCardData((prevData) => ({
      ...prevData,
      isAnonymous: isAnonymous,
    }));
  }, [isAnonymous]);

  React.useEffect(() => {
    if (images && images instanceof File) {
      if (
        images.type === "image/jpeg" ||
        images.type === "image/png" ||
        images.type === "image/gif"
      ) {
        
        const imageUrl = URL.createObjectURL(images);
        setCardData((prevData) => ({
          ...prevData,
          photoURLs: imageUrl,
        }));
      } else {
        toast({
          variant: "danger",
          title: "Notificação",
          description: `Por favor, selecione uma imagem válida (JPEG, PNG ou GIF), ${formattedDate}`,
        });
      }
    }
  }, [images]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", cardData.content || "");
    formData.append("isAnonymous", isAnonymous.toString());

    if (cardData.mentionedUsers.length > 0) {
      formData.append(
        "mentionedUsers",
        JSON.stringify(cardData.mentionedUsers)
      );
    }

    // Adiciona cada arquivo ao FormData
    uploadedImages.forEach((file) => {
      formData.append("photos", file); // "photos" deve ser o campo aceito pelo backend
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_POST_PUBLISH
        }${localStorage.getItem("token")}`,
          formData,
      );

      if (response.data.posted) {
        window.location.href = "/";
      } else {
        toast({
          variant: "danger",
          title: "Notificação",
          description: `Falha ao postar. Tente novamente, ${formattedDate}`,
        });
      }
    } catch (error: any) {
      console.error("Erro:", error);
      toast({
        variant: "danger",
        title: "Notificação",
        description: `Ocorreu um erro ao enviar sua postagem, ${error} ${formattedDate}`,
      });
    }
  }

  const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<mapboxgl.Map | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] =
    React.useState<SelectedLocation | null>(null);
  const [marker, setMarker] = React.useState<mapboxgl.Marker | null>(null);

  const [select, setSelect] = React.useState(1);

  React.useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PRIVATE_KEY;

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-48.3336, -10.1841], // Palmas, Tocantins
        zoom: 12,
      });
    }

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  const handleSearch = async () => {
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      searchQuery
    )}.json`;

    try {
      const response = await axios.get(geocodingUrl, {
        params: {
          access_token: mapboxgl.accessToken,
          limit: 5,
        },
      });

      setLocations(response.data.features || []);
    } catch (error) {
      console.error("Erro ao buscar locais:", error);
    }
  };

  const handleSelectLocation = (location: Location) => {
    const { center, place_name } = location;

    if (marker) {
      marker.remove();
    }

    if (mapRef.current) {
      const newMarker = new mapboxgl.Marker()
        .setLngLat(center)
        .addTo(mapRef.current);

      setMarker(newMarker);

      mapRef.current.setCenter(center);
      mapRef.current.setZoom(15);

      setSelectedLocation({ name: place_name, coordinates: center });
    }
  };

  getStatusUser(userId);

  const MenuNavbar = () => {
    return (
      <div onClick={handleIsAnonymous}>
        {!isAnonymous ? <EarthSolid /> : <IncognitoSolid />}
      </div>
    );
  };

  return (
    <>
      <NavBarReturn title="Publique" menu={<MenuNavbar />} />

      <main className="select-none flex flex-col md:flex-row justify-around items-center h-svh w-full">
        <LogoLayout />

        <div className="flex flex-col justify-center items-center space-y-2 h-screen md:h-full">
          <Card className="max-w-sm">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col relative space-y-2"
            >
              <CardHeader className={`${select === 1 ? "" : "hidden"}`}>
                <Label htmlFor="inputFoto">Upload</Label>
                <Input
                  type="file"
                  multiple
                  key="foto"
                  name="foto"
                  id="inputFoto"
                  onChange={handleFileChange}
                />

                <div className="grid grid-cols-3 gap-4">
                  {images.map((item, index) => (
                    <Card key={index} className="relative w-fit h-fit group">
                      <CardContent className="h-20 w-20 p-0">
                        {item.type.startsWith("image/") ? (
                          <img
                            src={item.src}
                            alt={`Uploaded ${index}`}
                            className="rounded-lg object-cover h-20 w-20"
                          />
                        ) : item.type.startsWith("video/") ? (
                          <video
                            src={item.src}
                            controls
                            className="rounded-lg object-cover h-20 w-20"
                          />
                        ) : null}
                      </CardContent>

                      <div
                        onClick={() => handleDeleteImage(index)}
                        className="cursor-pointer bg-danger text-white rounded-full absolute top-1 right-1 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <TrashOneSolid />
                      </div>
                    </Card>
                  ))}
                </div>
              </CardHeader>

              <CardHeader className={`${select === 2 ? "" : "hidden"}`}>
                <div>
                  <h1>Mapa com Pesquisa e Seleção</h1>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Pesquise um local"
                      style={{ width: "300px", padding: "8px" }}
                    />
                    <button onClick={handleSearch} style={{ padding: "8px" }}>
                      Pesquisar
                    </button>
                  </div>

                  <Label htmlFor="map">Mapa</Label>
                  <div ref={mapContainerRef} className="h-48 w-full" id="map" />

                  <div style={{ marginTop: "20px" }}>
                    <h2>Resultados:</h2>
                    {locations.length > 0 ? (
                      <ul>
                        {locations.map((location, index) => (
                          <li key={index}>
                            {location.place_name}{" "}
                            <button
                              onClick={() => handleSelectLocation(location)}
                            >
                              Selecionar
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Nenhum local encontrado.</p>
                    )}
                  </div>

                  {selectedLocation && (
                    <div style={{ marginTop: "20px" }}>
                      <h3>Local Selecionado:</h3>
                      <p>Nome: {selectedLocation.name}</p>
                      <p>
                        Coordenadas: {selectedLocation.coordinates[1]},{" "}
                        {selectedLocation.coordinates[0]}
                      </p>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex flex-col space-y-4">
                <Button
                  className={`${
                    select === 1 ? "hidden" : ""
                  } justify-between w-full`}
                  variant={"outline"}
                  type="button"
                  onClick={() => setSelect(1)}
                >
                  <div className="flex flex-row items-center gap-1">
                    <AlbumSolid className />
                    Galeria
                  </div>

                  <ChevronRight />
                </Button>

                <Button
                  className={`${
                    select === 2 ? "hidden" : ""
                  } justify-between w-full`}
                  variant={"outline"}
                  type="button"
                  onClick={() => setSelect(2)}
                >
                  <div className="flex flex-row items-center gap-1">
                    <LocationSelectedSolid />
                    Localização
                  </div>

                  <ChevronRight />
                </Button>

                <div>
                  <Label htmlFor="content">Descrição</Label>
                  <Input
                    type="text"
                    key="content"
                    placeholder="Adicione uma descrição"
                    name="content"
                    id="content"
                    onChange={handleChangeData}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Enviar
                </Button>
              </CardContent>
            </form>
          </Card>
        </div>
      </main>
    </>
  );
};

const PublishPage = () => {
  return (
    <>
      <PublishLayout />
      <Toaster />
    </>
  );
};

export default PublishPage;

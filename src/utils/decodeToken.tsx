import { jwtDecode } from "jwt-decode";
import { User } from "../interfaces/userInterface";

interface decodedObj {
    iat: string
    exp: string
    user: User
}
export default function decodeToken(token: string) {
    try {
        const decoded: decodedObj = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.log("Invalid token", error);
        return null
    }
}
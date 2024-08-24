export const TermsLayout = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-pink-500 dark:text-pink-600 font-recursive font-semibold text-3xl md:text-5xl">
          Política & Termos
        </h1>
        <p className="text-tiny">Última atualização 24 de Agosto de 2024</p>
      </div>

      <div className="flex flex-row justify-start items-center mx-5">
        <h2 className="font-semibold text-wrap text-xl md:text-2xl">
          <span className="text-pink-500 dark:text-pink-600 font-recursive mr-1">
            Política & Termos
          </span>
          ajudara você a entender como usamos, coletamos e compartilhamos suas
          informações.
        </h2>
      </div>

      <div className="flex flex-col justify-start items-start mx-5 space-y-1">
        <h3 className="text-pink-500 dark:text-pink-600 font-recursive font-semibold">
          1. Introdução
        </h3>
        <p className="font-inter font-semibold text-wrap text-tiny">
          O CrushIF é uma rede social destinada a conectar pessoas com
          interesses em comum. Ao utilizar o CrushIF, você concorda com os
          termos e condições descritos nesta política.
        </p>
      </div>

      <div className="flex flex-col justify-start items-start mx-5 space-y-1">
        <h3 className="text-pink-500 dark:text-pink-600 font-recursive font-semibold">
          2. Responsabilidade pelas Publicações
        </h3>
        <p className="font-inter font-semibold text-wrap text-tiny">
          O CrushIF é apenas uma plataforma que permite a seus usuários
          compartilhar conteúdo. O CrushIF não se responsabiliza pelo conteúdo
          das publicações, incluindo, mas não se limitando a, informações
          falsas, ofensivas, ilegais ou que violem os direitos de terceiros.
          Cada usuário é o único responsável pelo conteúdo que publica.
        </p>
      </div>

      <div className="flex flex-col justify-start items-start mx-5 space-y-1">
        <h3 className="text-pink-500 dark:text-pink-600 font-recursive font-semibold">
          3. Coleta de Dados:
        </h3>
        <p className="font-inter font-semibold text-wrap text-tiny">
          Ao se cadastrar no CrushIF, coletamos informações como seu nome de
          usuário, endereço de e-mail e outras informações que você
          voluntariamente fornecer. Além disso, utilizamos cookies para coletar
          dados sobre sua navegação na plataforma, como as páginas que você
          visita e as interações que realiza.
        </p>
      </div>

      <div className="flex flex-col justify-start items-start mx-5 space-y-1">
        <h3 className="text-pink-500 dark:text-pink-600 font-recursive font-semibold">
          3.1 Utilização dos Dados:
        </h3>
        <p className="font-inter font-semibold text-wrap text-tiny">
          Os dados coletados são utilizados para personalizar sua experiência no
          CrushIF, fornecer anúncios relevantes e melhorar nossos serviços.
        </p>
      </div>

      <div className="flex flex-col justify-start items-start mx-5 space-y-1">
        <h3 className="text-pink-500 dark:text-pink-600 font-recursive font-semibold">
          3.2 Segurança dos Dados:
        </h3>
        <p className="font-inter font-semibold text-wrap text-tiny">
          Todos os dados coletados são criptografados para garantir a sua
          segurança. No entanto, nenhuma transmissão de dados pela internet é
          completamente segura e não podemos garantir a segurança absoluta de
          suas informações.
        </p>
      </div>

      <div className="flex flex-col justify-start items-start mx-5 space-y-1">
        <h3 className="text-pink-500 dark:text-pink-600 font-recursive font-semibold">
          3.3 Compartilhamento de Dados:
        </h3>
        <p className="font-inter font-semibold text-wrap text-tiny">
          Não compartilhamos seus dados pessoais com terceiros, exceto em casos
          exigidos por lei ou quando necessário para prestar os serviços do
          CrushIF.
        </p>
      </div>

      <div className="flex flex-col justify-start items-start mx-5 space-y-1">
        <h3 className="text-pink-500 dark:text-pink-600 font-recursive font-semibold">
          4. Alterações na Política
        </h3>
        <p className="font-inter font-semibold text-wrap text-tiny">
          Reservamo-nos o direito de alterar esta política a qualquer momento.
          As alterações serão publicadas nesta página e a data da última
          atualização será indicada.
        </p>
      </div>

      <div className="flex flex-col justify-start items-start mx-5 space-y-1">
        <h3 className="text-pink-500 dark:text-pink-600 font-recursive font-semibold">
          5. Contato
        </h3>
        <p className="font-inter font-semibold text-wrap text-tiny">
          Para entrar em contato conosco sobre esta política, envie um e-mail
          para [seu_email].
        </p>
      </div>
    </>
  );
};

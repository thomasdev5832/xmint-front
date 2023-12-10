import React, { useState } from 'react';
import './home.css';
import ticketHandImage from '../assets/ticket-hand.jpg';
import rhcpImage from '../assets/rhcp.jpg';
import blinkImage from '../assets/blink.jpg';
import ironImage from '../assets/iron.jpg';
import rirImage from '../assets/rir.jpg';
import acdcImage from '../assets/acdc.jpg';
import fooImage from '../assets/foo.jpg';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://xmint-server.vercel.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setError(`Erro ao cadastrar o usuário: ${response.statusText}`);
        setUserData(null);
        setLoading(false);
        return;
      }

      const userData = await response.json();
      setUserData(userData);
      setError(null);
      setLoading(false);
    } catch (error: any) {
      setError(`Erro ao cadastrar o usuário: ${error.message}`);
      setUserData(null);
      setLoading(false);
    }
  };

  const handleMintTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!userData || !userData.user.id) {
        setError('Usuário não encontrado.');
        return;
      }

      const response = await fetch('https://xmint-server.vercel.app/mint/mint-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountId: userData.user.id }),
      });

      if (!response.ok) {
        setError(`Erro ao mintar o token: ${response.statusText}`);
        return;
      }

      const mintResult = await response.json();
      console.log(mintResult);

    } catch (error: any) {
      setError(`Erro ao mintar o token: ${error.message}`);
    }
  };

  const handleCopyToClipboard = () => {
    if (userData) {
      const walletAddress = userData.user.walletAddress;
      navigator.clipboard.writeText(walletAddress);
      alert(`Endereço da carteira copiado: ${walletAddress}`);
    }
  };

  const formatWalletAddress = (walletAddress: string) => {
    const firstPart = walletAddress.slice(0, 6);
    const lastPart = walletAddress.slice(-6);
    return `${firstPart}...${lastPart}`;
  };

  return (
    <section className="home">
      <div className="top-bar">
        <p>Tickets disponíveis por <strong>tempo limitado!</strong></p>
      </div>
      
      <div className='main'>
        <div className='hero'>
          <h1>Explore infinitos benefícios com o <strong>X-Ticket</strong>.</h1>
          <p className='sub'>Com o <strong>X-Ticket</strong>, além de garantir sua entrada nos eventos, você se torna protagonista de uma experiência única e inesquecível.</p>
        </div>
        <div className="container">
          <div>
            <svg className="icone" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.5 7A2.5 2.5 0 0 1 19 4.5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2.5a2.5 2.5 0 1 1 0 5V12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9.5A2.5 2.5 0 0 1 16.5 7Z"/>
            </svg>
            <h2>Entrada Privilegiada</h2>
            <p>Garanta não apenas seu ingresso, mas uma entrada privilegiada para viver momentos especiais e extraordinários.</p>
          </div>

          <div>
            <svg className="icone" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"/>
            </svg>
            <h2>Vivência Exclusiva</h2>
            <p>Transforme cada evento numa oportunidade única de explorar e aproveitar ao máximo o que há de melhor.</p>
          </div>

          <div>
            <svg className="icone" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 3h4M8 17h4m-9-5V8m14 4V8M1 1h4v4H1V1Zm14 0h4v4h-4V1ZM1 15h4v4H1v-4Zm14 0h4v4h-4v-4Z"/>
            </svg>
            <h2>Sem Limites</h2>
            <p>Explore funcionalidades inovadoras, mergulhe em novas possibilidades e crie memórias inesquecíveis.</p>
          </div>
        </div>
        <h2>Seu ingresso nunca mais será o mesmo!</h2>
        
        
        <div className="mint-form">
          {loading ? (
              <div className="loading-message">
                <div className="load"></div>
                <p>Realizando o cadastro...</p>
              </div>
            ) : userData ? (
              <div className="success-message">
                <h2>PARABÉNS!</h2>
                <p>Seu cadastrado foi realizado com sucesso!</p>
                <div className='wallet-address'>
                  <p>Aqui está o endereço da sua carteira:</p>
                  <button onClick={handleCopyToClipboard}>
                  {formatWalletAddress(JSON.stringify(userData.user.walletAddress).replace(/"/g, ''))}
                  </button>
                </div>
                <div className='mint-section'>
                  <h3>Pegue o seu X-Ticket e aproveite inúmeros benefícios!</h3>
                  
                  <img src={ticketHandImage} alt="" />
                  <form onSubmit={handleMintTicket}>
                    <button type="submit">Pegar X-Ticket</button>
                  </form>
                  <p>*o ticket estará disponível em sua carteira.</p>
                </div>
              </div>
              
            ) : (
              <div className='create-user'>
                <h2>CADASTRE E RECEBA SEU <strong>X-TICKET!</strong></h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleCreateUser}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit">Cadastrar</button>
                </form>
              </div>
            )}
        </div>

        <div className='events'>
          <h2>Próximos eventos</h2>
          <div className='events-container'>
            <div className='event-card'>
              <img src={rirImage} />
              <h3>Rock in Rio 2024</h3>
              <p>O maior evento de Rock 'n Roll do planeta completa 40 anos de história.</p>
              <button>Saiba mais</button>
           </div>
            <div className='event-card'>
              <img src={rhcpImage} />
              <h3>RHCP Concert</h3>
              <p>A banda californiada promete um show pra galera curtir e balançar todas estruturas do evento.</p>
              <button>Saiba mais</button>
           </div>
            <div className='event-card'>
              <img src={blinkImage} />
              <h3>Blink-182 Tour 2024</h3>
              <p>O trio formado por Mark Hoppus, Travis Barker e Tom DeLonge inaugura o retorno da formação original na América do Sul </p>
              <button>Saiba mais</button>
           </div>
            <div className='event-card'>
              <img src={ironImage} />
              <h3>Iron Maiden World Tour</h3>
              <p>O Iron Maiden está na estrada com sua turnê Future Past Tour e anunciou que passará pela América Latina em 2024.</p>
              <button>Saiba mais</button>
           </div>
            <div className='event-card'>
              <img src={acdcImage} />
              <h3>AC/DC World Tour</h3>
              <p>A banda de hard rock australiana AC/DC está prestes a fazer seu retorno aos palcos após 7 anos.</p>
              <button>Saiba mais</button>
           </div>
            <div className='event-card'>
              <img src={fooImage} />
              <h3>Foo FIghters - Everything or Nothing at All</h3>
              <p>Essa será a maior turnê da banda desde do lançamento de seu décimo primeiro álbum.</p>
              <button>Saiba mais</button>
           </div>
          </div>
        </div>

        <div className='airdrop'>
              <h2>Participe do nosso airdrop exclusivo.</h2>
              <p>Não perca a chance de ser recompensado por sua lealdade e apoio à nossa comunidade.</p>
              <p>Junte-se agora para aproveitar essa incrível oportunidade.</p>
              <button>Participar</button>
        </div>

      </div>

      

      <div className='bott'>
          <p>made by</p>
          <a href="https://github.com/thomasdev5832"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
      </div>
    </section>
  );
};

export default Home;

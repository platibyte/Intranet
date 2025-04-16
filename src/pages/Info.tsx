import React from 'react';
import Layout from '@/components/Layout';
import { ExternalLink, LinkIcon } from 'lucide-react';

const Info = () => {
  return (
    <Layout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold">Links und Adressen</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel rounded-xl p-6 lg:col-span-3 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-semibold mb-4">Nützliche Links</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary rounded-lg p-6">
              <div className="flex items-center mb-4">
                <LinkIcon className="text-primary mr-2" size={20} />
                <h3 className="font-medium">Familie & Schule</h3>
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="https://my.schoolfox.app/#/home" target="_blank" rel="noopener noreferrer" 
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Schoolfox.app</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://app.famanice.de/Famanice_Desktop/" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Famanice.de</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://www.anton.app/de" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Anton</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://www.antolin.westmann.de" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Antolin</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://web.schabi.ch" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Schabi</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://digital.lmvz.ch" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">LMVZ</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="bg-secondary rounded-lg p-6">
              <div className="flex items-center mb-4">
                <LinkIcon className="text-primary mr-2" size={20} />
                <h3 className="font-medium">Tools</h3>
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Google Maps</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://deepl.com" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">DeepL Übersetzer</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">ChatGPT</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://mail.google.com/mail/" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Gmail</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://onba.zkb.ch/ebanking" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">ZKB eBanking</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://fddb.info/db/i18n/myfddb/?lang=de" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">FDDB</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-secondary rounded-lg p-6">
              <div className="flex items-center mb-4">
                <LinkIcon className="text-primary mr-2" size={20} />
                <h3 className="font-medium">Entertainment</h3>
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="https://suno.ai" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Suno</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://www.kiwikinos.ch/" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Kiwikino.ch</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://www.nintendo.com/de-ch/" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Nintendo eShop</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://www.werstreamt.es/" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Wer streamt es?</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="bg-secondary rounded-lg p-6">
              <div className="flex items-center mb-4">
                <LinkIcon className="text-primary mr-2" size={20} />
                <h3 className="font-medium">Gaming & Lokale Server</h3>
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="https://de.minecraft.wiki" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Minecraft Wiki</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://pokemonquest.fandom.com/wiki/Jynx" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Pokemon Quest Wiki</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://pokequestrecipes.me/pokemon/jynx/" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Pokemon Quest Rezepte</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        

      </div>
      
      
      <div className="glass-panel rounded-xl p-6 mb-8 animate-slide-in" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-2xl font-semibold mb-4">Netzwerk-Übersicht</h2>

        <h3 className="font-medium text-lg mb-3">Verbundene Geräte</h3>
        <div className="bg-secondary rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/80 border-b border-border">
              <tr>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">Typenbezeichnung</th>
                <th className="text-left p-3 font-medium">Beschreibung</th>
                <th className="text-left p-3 font-medium">Wo/Wer</th>
                <th className="text-left p-3 font-medium">IP-Adresse</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="p-3">Router</td>
                <td className="p-3">Internet-Box2</td>
                <td className="p-3"></td>
                <td className="p-3">Swisscom</td>
                <td className="p-3 font-mono">192.168.0.254</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-3">Drucker</td>
                <td className="p-3">Canon MF650C</td>
                <td className="p-3"></td>
                <td className="p-3">Daniela</td>
                <td className="p-3 font-mono">192.168.0.100</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-3">SCP1711</td>
                <td className="p-3">Captiva R59-825</td>
                <td className="p-3">grosser PC</td>
                <td className="p-3">Tobias</td>
                <td className="p-3 font-mono">192.168.0.26</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-3">SCP1711smol</td>
                <td className="p-3">Joule Performance Arex RTX 3070</td>
                <td className="p-3">Notebook für Uni</td>
                <td className="p-3">Tobias</td>
                <td className="p-3 font-mono">192.168.0.23</td>
              </tr>
              <tr>
                <td className="p-3">SCP0212</td>
                <td className="p-3">ASUS ROG Strix G17</td>
                <td className="p-3">Notebook</td>
                <td className="p-3">Daniela</td>
                <td className="p-3 font-mono">192.168.0.21</td>
              </tr>
              <tr>
                <td className="p-3">Simons Laptop</td>
                <td className="p-3">DELL Latitude E6230</td>
                <td className="p-3">Notebook</td>
                <td className="p-3">Simon</td>
                <td className="p-3 font-mono">unbekannt</td>
              </tr>
              <tr>
                <td className="p-3">Convertible Laptop-2NMMPVVK</td>
                <td className="p-3">Lenovo Ideapad D330</td>
                <td className="p-3">Notebook</td>
                <td className="p-3">Tobias</td>
                <td className="p-3 font-mono">192.168.0.20</td>
              </tr>
              <tr>
                <td className="p-3">Raspberry Pi 5</td>
                <td className="p-3">Raspberry Pi 5</td>
                <td className="p-3"></td>
                <td className="p-3">Tobias</td>
                <td className="p-3 font-mono">192.168.0.17</td>
              </tr>
              <tr>
                <td className="p-3">Chromecast</td>
                <td className="p-3">Google Chromecast mit TV 4k (Google Assistant)</td>
                <td className="p-3"></td>
                <td className="p-3">Tobias</td>
                <td className="p-3 font-mono">unbekannt</td>
              </tr>
              <tr>
                <td className="p-3">Wingo TV-Box</td>
                <td className="p-3">TV-Box</td>
                <td className="p-3"></td>
                <td className="p-3">Swisscom</td>
                <td className="p-3 font-mono">192.168.0.10</td>
              </tr>
              <tr>
                <td className="p-3">TV</td>
                <td className="p-3">Panasonic Viera</td>
                <td className="p-3"></td>
                <td className="p-3">Tobias</td>
                <td className="p-3 font-mono">unbekannt</td>
              </tr>
              <tr>
                <td className="p-3">Sony Xperia XQ-ES54</td>
                <td className="p-3">Xperia 10 VI</td>
                <td className="p-3">Handy</td>
                <td className="p-3">Tobias</td>
                <td className="p-3 font-mono">192.168.0.12</td>
              </tr>
              <tr>
                <td className="p-3">Samsung Galaxy</td>
                <td className="p-3">Galaxy S21 FE 5G</td>
                <td className="p-3">Handy</td>
                <td className="p-3">Daniela</td>
                <td className="p-3 font-mono">192.168.0.13</td>
              </tr>
              <tr>
                <td className="p-3">Nintendo Switch Simon</td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3">Simon</td>
                <td className="p-3 font-mono">192.168.0.14</td>
              </tr>
              <tr>
                <td className="p-3">Nintendo Switch Dominik</td>
                <td className="p-3"></td>
                <td className="p-3"></td>
                <td className="p-3">Dominik</td>
                <td className="p-3 font-mono">192.168.0.15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Info;

import React from 'react';
import Layout from '@/components/Layout';
import GoogleWidget from '@/components/GoogleWidget';
import { Calendar, ExternalLink, FileText, HardDrive, LinkIcon, Server, Wifi } from 'lucide-react';

const Info = () => {
  return (
    <Layout>
      <div className="mb-8 animate-fade-in">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 mb-2">
          <Server size={14} className="mr-1" />
          Infos
        </div>
        <h1 className="text-4xl font-bold">Informationen</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Wichtige Informationen, Links und Ressourcen zu deinem Heimnetzwerk, Geräten und Konfiguration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel rounded-xl p-6 lg:col-span-2 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-semibold mb-4">Nützliche Links</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary rounded-lg p-6">
              <div className="flex items-center mb-4">
                <LinkIcon className="text-primary mr-2" size={20} />
                <h3 className="font-medium">Familie & Schule</h3>
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="https://schoolfox.app" target="_blank" rel="noopener noreferrer" 
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Schoolfox.app</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://famanice.de" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Famanice.de</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://moodle.org" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Moodle</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://gmail.com" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Gmail</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://zkb.ch/ebanking" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">ZKB eBanking</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="bg-secondary rounded-lg p-6">
              <div className="flex items-center mb-4">
                <LinkIcon className="text-primary mr-2" size={20} />
                <h3 className="font-medium">Tools & Entertainment</h3>
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
                  <a href="https://suno.ai" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Suno</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://kiwikino.ch" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Kiwikino.ch</span>
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
                  <a href="https://minecraft.wiki" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Minecraft Wiki</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a href="http://192.168.0.9" target="_blank" rel="noopener noreferrer"
                     className="flex items-center p-2 hover:bg-background rounded-lg transition">
                    <span className="flex-1">Minecraft Server (192.168.0.9)</span>
                    <ExternalLink size={16} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center mb-4">
              <FileText className="text-primary mr-2" size={20} />
              <h2 className="text-xl font-semibold">Nützliche Dokumente</h2>
            </div>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center p-2 hover:bg-secondary rounded-lg transition">
                  <span className="flex-1">Router-Handbuch.pdf</span>
                  <ExternalLink size={16} />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 hover:bg-secondary rounded-lg transition">
                  <span className="flex-1">Netzwerk-Konfiguration.docx</span>
                  <ExternalLink size={16} />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 hover:bg-secondary rounded-lg transition">
                  <span className="flex-1">WLAN-Zugangsdaten.txt</span>
                  <ExternalLink size={16} />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 hover:bg-secondary rounded-lg transition">
                  <span className="flex-1">Smart-Home-Anleitung.pdf</span>
                  <ExternalLink size={16} />
                </a>
              </li>
            </ul>
          </div>
          
          <div className="glass-panel rounded-xl p-6 animate-blur-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center mb-4">
              <Calendar className="text-primary mr-2" size={20} />
              <h2 className="text-xl font-semibold">Google Kalender</h2>
            </div>
            <GoogleWidget type="calendar" height="300px" />
          </div>
        </div>
      </div>
      
      <div className="glass-panel rounded-xl p-6 mb-8 animate-slide-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-semibold mb-4">Google Übersetzer</h2>
        <p className="text-muted-foreground mb-4">Nützlich für schnelle Übersetzungen von Anleitungen oder technischen Begriffen.</p>
        <GoogleWidget type="translate" height="300px" />
      </div>
      
      <div className="glass-panel rounded-xl p-6 mb-8 animate-slide-in" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-2xl font-semibold mb-4">Netzwerk-Übersicht</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-secondary rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Wifi className="text-primary mr-2" size={20} />
              <h3 className="font-medium">Internet</h3>
            </div>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="text-muted-foreground py-1">Status:</td>
                  <td className="text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Verbunden
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="text-muted-foreground py-1">IP-Adresse:</td>
                  <td className="text-right font-mono">192.168.1.1</td>
                </tr>
                <tr>
                  <td className="text-muted-foreground py-1">Download:</td>
                  <td className="text-right font-medium">1000 Mbps</td>
                </tr>
                <tr>
                  <td className="text-muted-foreground py-1">Upload:</td>
                  <td className="text-right font-medium">500 Mbps</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-secondary rounded-lg p-4">
            <div className="flex items-center mb-2">
              <HardDrive className="text-primary mr-2" size={20} />
              <h3 className="font-medium">Lokales Netzwerk</h3>
            </div>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="text-muted-foreground py-1">Gateway:</td>
                  <td className="text-right font-mono">192.168.1.1</td>
                </tr>
                <tr>
                  <td className="text-muted-foreground py-1">Subnet-Maske:</td>
                  <td className="text-right font-mono">255.255.255.0</td>
                </tr>
                <tr>
                  <td className="text-muted-foreground py-1">DHCP-Bereich:</td>
                  <td className="text-right font-mono">192.168.1.100-150</td>
                </tr>
                <tr>
                  <td className="text-muted-foreground py-1">DNS-Server:</td>
                  <td className="text-right font-mono">1.1.1.1, 8.8.8.8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <h3 className="font-medium text-lg mb-3">Verbundene Geräte</h3>
        <div className="bg-secondary rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/80 border-b border-border">
              <tr>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">IP-Adresse</th>
                <th className="text-left p-3 font-medium">MAC-Adresse</th>
                <th className="text-left p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="p-3">Router</td>
                <td className="p-3 font-mono">192.168.1.1</td>
                <td className="p-3 font-mono">AA:BB:CC:DD:EE:FF</td>
                <td className="p-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Online
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-3">PC-Arbeitszimmer</td>
                <td className="p-3 font-mono">192.168.1.100</td>
                <td className="p-3 font-mono">11:22:33:44:55:66</td>
                <td className="p-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Online
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-3">Laptop</td>
                <td className="p-3 font-mono">192.168.1.101</td>
                <td className="p-3 font-mono">22:33:44:55:66:77</td>
                <td className="p-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Online
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="p-3">NAS</td>
                <td className="p-3 font-mono">192.168.1.120</td>
                <td className="p-3 font-mono">33:44:55:66:77:88</td>
                <td className="p-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Online
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-3">Smart TV</td>
                <td className="p-3 font-mono">192.168.1.130</td>
                <td className="p-3 font-mono">44:55:66:77:88:99</td>
                <td className="p-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    Standby
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Info;

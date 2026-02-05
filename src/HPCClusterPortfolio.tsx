import React, { useState } from 'react';
// Importando mais ícones para um visual mais rico
import { 
  Github, Linkedin, ChevronLeft, ChevronRight, 
  Server, Cpu, Activity, Database, Zap, Users, ArrowRight 
} from 'lucide-react';
import './HPCClusterPortfolio.css';

// --- DADOS DO PROJETO ---
const projectData = {
  title: "Cluster HPC Modular & Escalável",
  subtitle: "Infraestrutura de supercomputação com orquestração profissional via Slurm para cargas de trabalho de IA, simulação e análise de dados.",
  
  gallery: [
    "/api/placeholder/1200/600", // Imagens maiores
    "/api/placeholder/1200/600", 
    "/api/placeholder/1200/600", 
  ],

  // Use números grandes e impactantes aqui
  results: [
    { label: "Nós de Computação", value: "16+" },
    { label: "Cores de Processamento", value: "1024" },
    { label: "GPUs Dedicadas", value: "32x A100" },
    { label: "Eficiência de Job", value: "98%" } 
  ],

  contributors: [
    {
      name: "Seu Nome",
      role: "Arquiteto de Soluções HPC",
      github: "https://github.com/seu-usuario",
      linkedin: "https://linkedin.com/in/seu-usuario",
      avatar: "/api/placeholder/150/150"
    },
    // Adicione outro membro para testar o layout
    /* {
      name: "Maria Silva",
      role: "Engenheira de Dados Sênior",
      github: "#",
      linkedin: "#",
      avatar: "/api/placeholder/150/150"
    }, */
  ]
};

// --- COMPONENTES ---

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="carousel-section-wrapper container">
      <div className="carousel-container">
        <button onClick={prevSlide} className="nav-button" aria-label="Anterior"><ChevronLeft size={24} /></button>
        <img src={images[currentIndex]} alt={`Visão do Cluster slide ${currentIndex + 1}`} className="carousel-image" />
        <button onClick={nextSlide} className="nav-button" aria-label="Próximo"><ChevronRight size={24} /></button>
        
        <div className="dots">
          {images.map((_, idx) => (
            <span 
              key={idx} 
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
      <p className="gallery-caption">
        Galeria: Visão do hardware físico, arquitetura de rede e interfaces de gerenciamento Slurm.
      </p>
    </div>
  );
};

const Section = ({ title, icon: Icon, children, dark = false, intro = null }) => (
  <section className={`section ${dark ? 'dark' : ''}`}>
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">
            {Icon && <Icon size={32} strokeWidth={2.5} />} {title}
        </h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
      <div className="section-content">{children}</div>
    </div>
  </section>
);

// --- COMPONENTE PRINCIPAL ---

const HPCClusterPortfolio = () => {
  
  // Função para rolar suavemente até a seção de visão geral
  const scrollToOverview = () => {
    document.getElementById('overview-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hpc-page">
      
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content container">
          <h1 className="hero-title">{projectData.title}</h1>
          <p className="hero-subtitle">{projectData.subtitle}</p>
          <button onClick={scrollToOverview} className="hero-cta">
            Conheça a Arquitetura <ArrowRight size={18} style={{marginLeft: '8px', display: 'inline-block', verticalAlign: 'middle'}}/>
          </button>
        </div>
      </header>

      {/* Carousel Section (Flutuando sobre o Hero) */}
      <Carousel images={projectData.gallery} />

      {/* Visão Geral (Pitch) */}
      <div id="overview-section">
        <Section 
            title="Visão Geral & Impacto" 
            icon={Activity}
            intro="Transformando hardware bruto em um supercomputador modular e inteligente."
        >
            <p className="text">
            Este projeto não é apenas sobre conectar servidores; é sobre criar um ambiente de <strong>computação de alto desempenho (HPC)</strong> profissional. Em vez de máquinas isoladas, entregamos um cluster unificado onde o Slurm atua como o "cérebro", gerenciando recursos, filas e prioridades para garantir que cada ciclo de CPU e GPU seja utilizado ao máximo.
            </p>
            
            <ul className="feature-list">
            <li>
                <div className="feature-icon-wrapper"><Zap size={24} /></div>
                <div className="feature-text">
                    <strong>IA & Deep Learning</strong>
                    Treinamento e inferência acelerados com alocação dinâmica de GPUs via Slurm GRES.
                </div>
            </li>
            <li>
                <div className="feature-icon-wrapper"><Cpu size={24} /></div>
                <div className="feature-text">
                    <strong>Simulações Paralelas</strong>
                    Execução de jobs MPI distribuídos em múltiplos nós com baixa latência.
                </div>
            </li>
            <li>
                <div className="feature-icon-wrapper"><Database size={24} /></div>
                <div className="feature-text">
                    <strong>Processamento de Dados</strong>
                    Pipelines de ETL pesados e análise de big data em lote (batch processing).
                </div>
            </li>
            <li>
                <div className="feature-icon-wrapper"><Users size={24} /></div>
                <div className="feature-text">
                    <strong>Ambiente Multiusuário</strong>
                    Governança completa com filas separadas, limites de recursos e contabilidade justa.
                </div>
            </li>
            </ul>
        </Section>
      </div>

      {/* Detalhes Técnicos */}
      <Section 
        title="Arquitetura Técnica" 
        dark 
        icon={Server}
        intro="Projetado para escalabilidade horizontal, isolamento lógico e alta disponibilidade."
      >
        <div className="grid-two">
          <div className="card">
            <div className="card-icon"><Server size={40} strokeWidth={1.5} /></div>
            <h3 className="card-title">Orquestração Profissional (Slurm)</h3>
            <p className="card-text">
              Controle total do ciclo de vida dos jobs: submissão (<code>sbatch</code>), agendamento inteligente baseado em prioridade/recursos, e alocação granular de CPU/RAM. Arquitetura resiliente com <code>slurmctld</code> (controlador) e <code>slurmd</code> (nós).
            </p>
          </div>
          <div className="card">
            <div className="card-icon"><Zap size={40} strokeWidth={1.5} /></div>
            <h3 className="card-title">Recursos Acelerados (GRES)</h3>
            <p className="card-text">
              Integração nativa com GPUs e aceleradores via <strong>Generic Resources (GRES)</strong>. Permite que usuários solicitem recursos específicos (ex: <code>--gres=gpu:a100:2</code>) garantindo isolamento e performance máxima para workloads de IA.
            </p>
          </div>
        </div>
      </Section>

      {/* Resultados - O Grande Destaque */}
      <Section title="Resultados & Performance" icon={Cpu}>
        <div className="results-grid">
          {projectData.results.map((res, index) => (
            <div key={index} className="result-item">
              {/* Ícone pequeno opcional acima do número */}
              {/* <Activity size={20} color="var(--primary-color)" style={{marginBottom: '10px'}}/> */}
              <span className="result-value">{res.value}</span>
              <span className="result-label">{res.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Contribuintes */}
      <Section title="Equipe & Contribuintes" dark intro="As mentes por trás da infraestrutura.">
        <div className="contributors-grid">
          {projectData.contributors.map((member, index) => (
            <div key={index} className="contributor-card">
              <img src={member.avatar} alt={member.name} className="avatar" />
              <div className="contributor-info">
                <h4 className="contributor-name">{member.name}</h4>
                <p className="contributor-role">{member.role}</p>
                <div className="social-links">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="GitHub">
                    <Github size={18} />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
            <p>© {new Date().getFullYear()} Projeto de Cluster HPC. Desenvolvido com React & Slurm.</p>
        </div>
      </footer>
    </div>
  );
};

export default HPCClusterPortfolio;
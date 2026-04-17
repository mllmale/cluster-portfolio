import React, { ReactNode, ElementType } from 'react';
import { 
  Github, Linkedin, ChevronLeft, ChevronRight, 
  Server, Cpu, Activity, Database, Zap, Users, ArrowRight, Network, Code2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area,
  LabelList
} from 'recharts';
import './HPCClusterPortfolio.css';

// --- DADOS DO PROJETO ---

const benchmarkData = {
  cudaBandwidth: [
    { name: 'HtoD', value: 0.74, full: 'Host to Device' },
    { name: 'DtoH', value: 0.82, full: 'Device to Host' },
    { name: 'DtoD', value: 191.4, full: 'Device to Device' },
  ],
  ncclScaling: [
    { size: '8KB', bw: 3.7 },
    { size: '16KB', bw: 5.6 },
    { size: '32KB', bw: 8.1 },
    { size: '64KB', bw: 15.8 },
    { size: '128KB', bw: 12.9 },
    { size: '256KB', bw: 24.2 },
    { size: '512KB', bw: 44.0 },
  ],
  storageLatency: [
    { p: '1%', val: 87 },
    { p: '10%', val: 116 },
    { p: '50%', val: 31589 },
    { p: '90%', val: 61080 },
    { p: '99%', val: 91751 },
  ]
};

const projectData = {
  title: "Infraestrutura HPC & Cluster Distribuído",
  subtitle: "Arquitetura de alta performance com orquestração Slurm. Projetada para ser o backbone de engenharia em rotinas intensivas de Machine Learning distribuído e processamento de Visão Computacional.",
  
  results: [
    { label: "Nós de Computação", value: "9" },
    { label: "GPUs GTX 1070", value: "9" },
    { label: "Banda D2D CUDA", value: "191 GB/s" },
    { label: "Testes HPL (Pass)", value: "864" }
  ],

contributors: [
    {
      name: "Maria Letícia Gonçalves",
      role: "Engenheira de Computação & Backend Developer",
      github: "https://github.com/mllmale",
      linkedin: "www.linkedin.com/in/maria-letícia-gonçalves",
      avatar: "/api/placeholder/150/150"
    },
    {
      name: "Esdrás Alves dos Santos",
      role: "Engenheiro de Computação & Backend Developer",
      github: "https://github.com/mllmale",
      linkedin: "https://www.linkedin.com/in/esdr%C3%A1s-alves-dos-santos-1298b9332",
      avatar: "/api/placeholder/150/150"
    },
    {
      name: "Rafael Almeida Santos",
      role: "Engenheiro de Computação & Backend Developer",
      github: "https://github.com/El0wki",
      linkedin: "https://www.linkedin.com/in/el0wki/",
      avatar: "/api/placeholder/150/150"
    }

  ]
};

// --- TIPAGENS ---

interface SectionProps {
  title: string;
  children: ReactNode;
  dark?: boolean;
  intro?: string;
}

interface ChartCardProps {
  title: string;
  icon: ElementType;
  children: ReactNode;
  subtitle: string;
}

// --- COMPONENTES AUXILIARES ---

const Section = ({ title, children, dark = false, intro = "" }: SectionProps) => (
  <section className={`section ${dark ? 'dark' : ''}`}>
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
      {children}
    </div>
  </section>
);

const ChartCard = ({ title, icon: Icon, children, subtitle }: ChartCardProps) => (
  <div className="chart-card" style={{ 
    backgroundColor: '#1e293b', 
    padding: '1.5rem', 
    borderRadius: '16px', 
    border: '1px solid #334155',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
      <Icon size={20} className="text-blue-400" stroke="#60a5fa" />
      <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', margin: 0 }}>{title}</h3>
    </div>
    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{subtitle}</p>
    <div style={{ width: '100%', height: 250, flexGrow: 1 }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---

const HPCClusterPortfolio = () => {
  return (
    <div className="portfolio">
      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="badge">Engenharia de Computação</div>
            <h1 className="hero-title">{projectData.title}</h1>
            <p className="hero-subtitle">{projectData.subtitle}</p>
            <div className="tech-stack">
              <span>Slurm</span>
              <span>CUDA</span>
              <span>NCCL</span>
              <span>Go</span>
              <span>Linux</span>
              <span>MPI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Resultados e Overview */}
      <Section title="Overview da Infraestrutura" intro="Capacidade computacional configurada e validada através de benchmarks industriais.">
        <div className="results-grid">
          {projectData.results.map((res, index) => (
            <div key={index} className="result-card">
              <span className="result-value">{res.value}</span>
              <span className="result-label">{res.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Arquitetura e Contexto */}
      <Section title="Arquitetura e Aplicação" dark intro="Como o cluster foi estruturado para resolver problemas complexos.">
        <div className="arch-grid">
          <div className="arch-card">
            <Network size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
            <h3>Orquestração Distribuída</h3>
            <p>O ambiente foi modelado utilizando o <strong>Slurm Workload Manager</strong> para garantir o gerenciamento eficiente de filas e alocação de recursos entre os 9 nós. A comunicação entre os nós é otimizada via biblioteca NCCL, permitindo escalabilidade linear em tarefas que exigem intensa troca de dados.</p>
          </div>
          <div className="arch-card">
            <Code2 size={32} color="#3b82f6" style={{ marginBottom: '1rem' }} />
            <h3>Backbone para Machine Learning</h3>
            <p>Desenvolvido como base de engenharia, o cluster é capaz de suportar o treinamento de modelos preditivos distribuídos. O foco principal da infraestrutura é o suporte a cargas de trabalho pesadas de <strong>Visão Computacional</strong>, distribuindo os tensores através das múltiplas GPUs do ambiente.</p>
          </div>
        </div>
      </Section>

      {/* Dashboard de Benchmarks */}
      <Section title="Análise de Performance (Benchmarks)" intro="Métricas extraídas em tempo real durante os testes de estresse da rede, I/O e GPUs.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          <ChartCard title="Largura de Banda CUDA" icon={Zap} subtitle="Transferência via PINNED Memory (GB/s)">
            <BarChart data={benchmarkData.cudaBandwidth} margin={{ top: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} 
                cursor={{ fill: '#334155', opacity: 0.4 }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} minPointSize={10}>
                <LabelList dataKey="value" position="top" fill="#94a3b8" fontSize={12} fontWeight="bold" />
              </Bar>
            </BarChart>
          </ChartCard>

          <ChartCard title="NCCL All-Reduce" icon={Activity} subtitle="Banda algorítmica por tamanho de mensagem (GB/s)">
            <AreaChart data={benchmarkData.ncclScaling}>
              <defs>
                <linearGradient id="colorBw" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="size" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
              <Area type="monotone" dataKey="bw" stroke="#10b981" fillOpacity={1} fill="url(#colorBw)" strokeWidth={3} />
            </AreaChart>
          </ChartCard>

          <ChartCard title="Latência de I/O (FIO)" icon={Database} subtitle="Percentis de leitura aleatória (µs)">
            <LineChart data={benchmarkData.storageLatency}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="p" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
              <Line type="stepAfter" dataKey="val" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} />
            </LineChart>
          </ChartCard>

        </div>
      </Section>

      {/* Equipe */}
      <Section title="Engenharia & Desenvolvimento" dark intro="Projeto desenvolvido e arquitetado por:">
        <div className="contributors-grid">
          {projectData.contributors.map((member, index) => (
            <div key={index} className="contributor-card">
              <img src={member.avatar} alt={member.name} className="avatar" />
              <div className="contributor-info">
                <h4 className="contributor-name">{member.name}</h4>
                <p className="contributor-role">{member.role}</p>
                <div className="social-links">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="icon-link">
                    <Github size={20} />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="icon-link">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <footer className="footer">
        <div className="container">
            <p>© {new Date().getFullYear()} Cluster HPC & Machine Learning Backbone.</p>
        </div>
      </footer>
    </div>
  );
};

export default HPCClusterPortfolio;
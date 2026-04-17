# 🚀 Distributed HPC Cluster & ML Backbone

![Status: Active](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![Slurm](https://img.shields.io/badge/Slurm-Workload_Manager-blue?style=flat-square&logo=linux)
![CUDA](https://img.shields.io/badge/CUDA-11.x-green?style=flat-square&logo=nvidia)
![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?style=flat-square&logo=go)
![Security](https://img.shields.io/badge/Security-Hardened-red?style=flat-square)

> **Engenharia de Infraestrutura e Backend Distribuído** para treinamento acelerado de modelos de Machine Learning e processamento intensivo de Visão Computacional.

Este repositório documenta a arquitetura, o pipeline de automação e os benchmarks de um cluster de High-Performance Computing (HPC) com 9 nós físicos. O ambiente foi projetado desde o nível de hardware até a camada de aplicação para garantir escalabilidade linear, resiliência de dados e segurança na execução de jobs distribuídos.

## 🏗️ Arquitetura do Sistema

A topologia do cluster foi desenhada para minimizar gargalos de I/O e maximizar a comunicação entre as GPUs durante o treinamento de modelos preditivos.

* **Nós de Computação:** 9 nós distribuídos (Gerenciados via `Slurm`).
* **Aceleração Gráfica:** 7x NVIDIA GeForce GTX 1070 dedicadas ao processamento de tensores.
* **Orquestração:** Slurm Workload Manager para fila de jobs e alocação dinâmica de recursos.
* **Comunicação Multi-GPU:** Nvidia Collective Communications Library (NCCL) e MPI para sincronização de gradientes (All-Reduce).
* **Backend & Automação:** Plataforma de distribuição de workloads desenvolvida em **Go**, garantindo concorrência nativa e alta performance na submissão e monitoramento de tarefas.
* **Segurança:** Acesso e comunicação entre serviços protegidos por tokens JWT, com pipelines de remediação automatizada para garantir a integridade do ambiente.

---

## 📊 Validação e Benchmarks (Testes Reais)

A infraestrutura não é apenas teórica; ela foi validada através de testes rigorosos padrão da indústria para garantir a viabilidade como backbone de engenharia.

### 1. CUDA Bandwidth (Memory Transfer)
Testes de transferência de memória via `PINNED Memory` evidenciaram o throughput real do hardware, destacando a eficiência da comunicação direta entre dispositivos.

| Direção | Largura de Banda (GB/s) |
| :--- | :--- |
| **Host to Device (PCIe)** | 0.74 GB/s |
| **Device to Host (PCIe)** | 0.82 GB/s |
| **Device to Device (VRAM)** | **191.40 GB/s** 🚀 |

### 2. HPL (High-Performance Linpack)
O cluster resolveu com sucesso sistemas lineares densos, validando a estabilidade térmica e computacional sob estresse máximo.
* **Status:** `PASSED`
* **Testes Concluídos e Validados:** 864/864 (Zero falhas residuais)

### 3. NCCL All-Reduce Scaling
Teste de banda algorítmica (`algbw`) através de 7 nós simulando o comportamento de sincronização de pesos em redes neurais profundas.

| Tamanho da Mensagem | Algorithm Bandwidth (GB/s) |
| :--- | :--- |
| 64 KB | 15.8 |
| 128 KB | 12.9 |
| 256 KB | 24.2 |
| **512 KB** | **44.0** |

### 4. Storage I/O Latency (FIO)
Validação do sistema de arquivos compartilhado com testes de leitura/escrita aleatória (`randread`).
* **IOPS Médio:** 2.056
* **Latência P90:** 61.08 ms
* **Latência P99:** 91.75 ms

---

## 💻 Exemplo de Submissão de Job (Computer Vision)

A plataforma permite a submissão rápida de rotinas de visão computacional distribuídas. Abaixo, um exemplo de script de alocação `sbatch` gerado pelo nosso backend em Go:

```bash
#!/bin/bash
#SBATCH --job-name=cv_model_train
#SBATCH --nodes=4
#SBATCH --ntasks-per-node=1
#SBATCH --gres=gpu:1
#SBATCH --time=12:00:00
#SBATCH --output=logs/cv_train_%j.log

echo "Iniciando treinamento distribuído de Visão Computacional..."
srun --mpi=pmix ./train_distributed_model --backend=nccl
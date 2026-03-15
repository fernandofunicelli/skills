<#
.SYNOPSIS
    Instalador Automático da Diamond Intelligence Library.
.DESCRIPTION
    Este script copia os Pilares de Diamante e a governança operacional para o diretório de destino.
#>

param (
    [Parameter(Mandatory=$true)]
    [string]$TargetDir
)

if (!(Test-Path $TargetDir)) {
    Write-Error "O diretório de destino não existe: $TargetDir"
    exit
}

$SourceDir = $PSScriptRoot

Write-Host "💎 Iniciando Setup Diamond Standard..." -ForegroundColor Cyan

# 1. Copiar Pasta de Skills
Write-Host "📦 Instalando Skills..."
Copy-Item -Path "$SourceDir\skills" -Destination $TargetDir -Recurse -Force

# 2. Instalar Governança Antigravity
Write-Host "🛡️ Instalando AGENTS.md..."
Copy-Item -Path "$SourceDir\AGENTS.md" -Destination $TargetDir -Force

# 3. Instalar Configurações Claude Code
Write-Host "🤖 Instalando Skill Rules para Claude Code..."
if (!(Test-Path "$TargetDir\.claude")) { New-Item -ItemType Directory -Path "$TargetDir\.claude" }
Copy-Item -Path "$SourceDir\.claude" -Destination $TargetDir -Recurse -Force

Write-Host "✅ Diamond Standard instalado com sucesso em $TargetDir!" -ForegroundColor Green
Write-Host "🚀 Próximo passo: Peça ao seu Agente para ler o AGENTS.md e iniciar a orquestração."

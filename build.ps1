#!/usr/bin/env pwsh

# Build script for React Power BI Report Site with Vite

Write-Host ""
Write-Host "🏗️  Building React Power BI Report Site..." -ForegroundColor Cyan
Write-Host ""

# Validate that node_modules exists
if (!(Test-Path "node_modules")) {
    Write-Host "⚠️  node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ npm install failed" -ForegroundColor Red
        exit 1
    }
}

# Load environment variables
Write-Host "📋 Loading environment variables..." -ForegroundColor Cyan
. .\load-env.ps1

# Validate required variables
$missingVars = @()
if (!$env:POWERBI_CLIENT_ID) { $missingVars += "POWERBI_CLIENT_ID" }
if (!$env:POWERBI_TENANT_ID) { $missingVars += "POWERBI_TENANT_ID" }
if (!$env:POWERBI_WORKSPACE_ID) { $missingVars += "POWERBI_WORKSPACE_ID" }
if (!$env:POWERBI_REPORT_ID) { $missingVars += "POWERBI_REPORT_ID" }

if ($missingVars.Count -gt 0) {
    Write-Host "❌ Missing required environment variables:" -ForegroundColor Red
    $missingVars | ForEach-Object { Write-Host "   - $_" -ForegroundColor Yellow }
    Write-Host ""
    Write-Host "Please set the following environment variables:" -ForegroundColor Yellow
    Write-Host "  `$env:POWERBI_CLIENT_ID = 'your-client-id'" -ForegroundColor Gray
    Write-Host "  `$env:POWERBI_TENANT_ID = 'your-tenant-id'" -ForegroundColor Gray
    Write-Host "  `$env:POWERBI_WORKSPACE_ID = 'your-workspace-id'" -ForegroundColor Gray
    Write-Host "  `$env:POWERBI_REPORT_ID = 'your-report-id'" -ForegroundColor Gray
    Write-Host "  `$env:POWERBI_REPORT_NAME = 'your-report-name' [optional]" -ForegroundColor Gray
    exit 1
}

Write-Host "✅ Environment variables loaded" -ForegroundColor Green
Write-Host ""

# Run Vite build
Write-Host "🔨 Building with Vite..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Vite build failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Vite build complete!" -ForegroundColor Green
Write-Host ""

# Copy staticwebapp.config.json to dist
Write-Host "⚙️  Copying staticwebapp.config.json..." -ForegroundColor Cyan
Copy-Item staticwebapp.config.json dist/staticwebapp.config.json -Force
Write-Host "✅ staticwebapp.config.json copied" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Build complete!" -ForegroundColor Green
Write-Host "   Output directory: dist" -ForegroundColor Gray
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Test locally: npm run preview" -ForegroundColor Gray
Write-Host "  2. Deploy to Azure Static Web Apps" -ForegroundColor Gray
Write-Host ""

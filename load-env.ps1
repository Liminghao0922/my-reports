# Load environment variables from .env file
# Usage: . .\load-env.ps1

$envFile = ".env"

if (!(Test-Path $envFile)) {
    Write-Host "❌ .env file not found. Please copy .env.example to .env and fill in your values." -ForegroundColor Red
    exit 1
}

Write-Host "📄 Loading environment variables from .env..." -ForegroundColor Cyan

Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    
    # Skip comments and empty lines
    if ($line -match '^#' -or $line -eq '') {
        return
    }
    
    # Parse KEY=VALUE
    if ($line -match '^([^=]+)=(.*)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        
        # Remove quotes if present
        $value = $value -replace '^["'']|["'']$', ''
        
        # Skip placeholder values
        if ($value -match 'your-.*-here' -or $value -eq 'Your Report Name') {
            Write-Host "⚠️  $key is not set (using placeholder)" -ForegroundColor Yellow
            return
        }
        
        # Set environment variable
        Set-Item -Path "env:$key" -Value $value
        Write-Host "✅ $key loaded" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "✅ Environment variables loaded successfully!" -ForegroundColor Green
Write-Host "You can now run: .\build.ps1" -ForegroundColor Cyan

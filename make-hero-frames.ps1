# =====================================================================
#  make-hero-frames.ps1
#  Slices a rotating-character video into the numbered frame sequence
#  the portfolio hero needs. One command — no ffmpeg knowledge required.
#
#  USAGE (from the ishika-portfolio folder):
#     .\make-hero-frames.ps1 -Video "C:\path\to\your-character-video.mp4"
#
#  Optional:
#     -Fps 15      how many frames per second to extract (default 15)
#     -Width 1280  output width in px (default 1280; height auto)
#
#  Result: public/hero-frames/frame-001.jpg, frame-002.jpg, ...
#  (FrameScroll.jsx reads these; if the count isn't 240, pass it as
#   <FrameScroll frameCount={N} /> in src/App.jsx)
# =====================================================================
param(
  [Parameter(Mandatory = $true)] [string]$Video,
  [int]$Fps = 15,
  [int]$Width = 1280
)

# Locate ffmpeg: try PATH first, then the winget install location.
$ffmpeg = (Get-Command ffmpeg -ErrorAction SilentlyContinue).Source
if (-not $ffmpeg) {
  $guess = Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WinGet\Packages" -Recurse -Filter ffmpeg.exe -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($guess) { $ffmpeg = $guess.FullName }
}
if (-not $ffmpeg) { Write-Error "ffmpeg not found. Open a new terminal (winget adds it to PATH), or reinstall with: winget install Gyan.FFmpeg"; exit 1 }

if (-not (Test-Path $Video)) { Write-Error "Video not found: $Video"; exit 1 }

$outDir = Join-Path $PSScriptRoot "public\hero-frames"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
Get-ChildItem $outDir -Filter *.jpg -ErrorAction SilentlyContinue | Remove-Item -Force

Write-Host "Slicing '$Video' at $Fps fps, width ${Width}px ..." -ForegroundColor Cyan
& $ffmpeg -y -i $Video -vf "fps=$Fps,scale=${Width}:-2" -q:v 4 (Join-Path $outDir "frame-%03d.jpg")

$count = (Get-ChildItem $outDir -Filter *.jpg | Measure-Object).Count
Write-Host "Done. $count frames written to public/hero-frames/" -ForegroundColor Green
if ($count -ne 240) { Write-Host "NOTE: update src/App.jsx to <FrameScroll frameCount={$count} />" -ForegroundColor Yellow }
if ($count -lt 60)  { Write-Host "Tip: that's quite few frames — a longer clip or higher -Fps gives smoother rotation." -ForegroundColor Yellow }
if ($count -gt 240) { Write-Host "Tip: over 240 frames is heavy — re-run with a lower -Fps (e.g. -Fps 12)." -ForegroundColor Yellow }

Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Image]::FromFile("D:\Web_Data\BabuElectronics\public\logo.png")
Write-Output "Source Dimensions: $($src.Width) x $($src.Height)"
$src.Dispose()

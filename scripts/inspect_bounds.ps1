Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("D:\Web_Data\BabuElectronics\public\logo.png")
$w = $src.Width
$h = $src.Height

$minX = $w; $minY = $h; $maxX = 0; $maxY = 0

for ($y = 0; $y -lt $h; $y += 2) {
    for ($x = 0; $x -lt $w; $x += 2) {
        $c = $src.GetPixel($x, $y)
        # Check if not transparent and not white
        if ($c.A -gt 20 -and ($c.R -lt 240 -or $c.G -lt 240 -or $c.B -lt 240)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$src.Dispose()
Write-Output "Content Bounding Box: X=$minX..$maxX (W=$($maxX - $minX)), Y=$minY..$maxY (H=$($maxY - $minY))"

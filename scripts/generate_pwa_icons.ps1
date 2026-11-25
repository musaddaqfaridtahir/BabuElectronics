Add-Type -AssemblyName System.Drawing

$srcPath = "D:\Web_Data\BabuElectronics\public\logo.png"
$srcImg = [System.Drawing.Image]::FromFile($srcPath)

function Generate-Icon($size, $destPath, $paddingRatio) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Clean solid white background
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $g.FillRectangle($brush, 0, 0, $size, $size)

    # Calculate centered bounding box with safe padding
    $availW = $size * (1.0 - (2 * $paddingRatio))
    $availH = $size * (1.0 - (2 * $paddingRatio))

    $srcAspect = $srcImg.Width / $srcImg.Height
    $targetAspect = $availW / $availH

    if ($srcAspect -gt $targetAspect) {
        $destW = $availW
        $destH = $availW / $srcAspect
    } else {
        $destH = $availH
        $destW = $availH * $srcAspect
    }

    $destX = ($size - $destW) / 2.0
    $destY = ($size - $destH) / 2.0

    $destRect = New-Object System.Drawing.RectangleF($destX, $destY, $destW, $destH)
    $g.DrawImage($srcImg, $destRect)

    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Generated $destPath ($size x $size)"
}

# 1. 512x512 PWA Icon (Maskable & standard)
Generate-Icon 512 "D:\Web_Data\BabuElectronics\public\icon-512.png" 0.15

# 2. 192x192 PWA Icon
Generate-Icon 192 "D:\Web_Data\BabuElectronics\public\icon-192.png" 0.15

# 3. 180x180 Apple Touch Icon
Generate-Icon 180 "D:\Web_Data\BabuElectronics\public\apple-touch-icon.png" 0.12

$srcImg.Dispose()
Write-Host "All PWA icons generated successfully!"

# Aurora Portal Build Script v5.0.0 (Recursive-Fidelity Edition)
$workspacePath = (Get-Location).Path
$portalDir = Join-Path $workspacePath "management\08_Documentation_Portal"
$targetScript = Join-Path $portalDir "data.js"
$templatePath = Join-Path $workspacePath ".agent\assets\template.html"

if (!(Test-Path $portalDir)) { New-Item -ItemType Directory -Path $portalDir -Force }

function Get-FidelityPath($relPath) {
    $fullPath = Join-Path $workspacePath $relPath
    if (Test-Path $fullPath) {
        $webPath = $relPath.Replace('\', '/')
        return "'../../$webPath'"
    }
    return $null
}


# Dynamic Scanner for Standard Directories
function Get-FirstDoc($dirSubPath) {
    $targetDir = Join-Path $workspacePath $dirSubPath
    if (Test-Path $targetDir) {
        $file = Get-ChildItem -Path $targetDir -Filter "*.md" | Select-Object -First 1
        if ($null -ne $file) { return Get-FidelityPath $($dirSubPath + "/" + $file.Name) }
    }
    return $null
}

$docs = @{}
$docs["dashboard"] = Get-FirstDoc "management/00_Master_Report"
$docs["01"] = Get-FirstDoc "management/01_Requirements"
$docs["02"] = Get-FirstDoc "management/02_Planning"

# Scan Execution Logs (Phase_XX_*)
Get-ChildItem -Path (Join-Path $workspacePath "management/03_Implementation") -Filter "*.md" -Recurse | ForEach-Object {
    if ($_.Directory.Name -match "Phase_(\d+)") {
        $phaseNum = [int]$matches[1]
        $rel = $_.FullName.Replace($workspacePath + "\", "")
        $docs["p$phaseNum-log"] = Get-FidelityPath $rel
    }
}

# Scan Quality Results (Phase_XX_Quality_*)
Get-ChildItem -Path (Join-Path $workspacePath "management\04_Quality_Gate") -Filter "*.md" -Recurse | ForEach-Object {
    if ($_.Directory.Name -match "Phase_(\d+)" -or $_.Name -match "Phase_(\d+)") {
        $phaseNum = [int]$matches[1]
        $rel = $_.FullName.Replace($workspacePath + "\", "")
        $docs["p$phaseNum-res"] = Get-FidelityPath $rel
    }
}

# Scan Delivery, Retro & Final
$docs["delivery"] = Get-FirstDoc "management/06_Delivery"
$docs["res-final"] = Get-FidelityPath "management/04_Quality_Gate/Final_Quality_Report.md"
$docs["retro"] = Get-FirstDoc "management/07_Retrospective"


# Build JSON
$jsonLines = @()
foreach ($key in $docs.Keys) {
    if ($null -ne $docs[$key]) { $jsonLines += "`"$key`": $($docs[$key])" }
}
$docsJson = "window.projectDocs = { " + ($jsonLines -join ", ") + " };"

$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding($False)
[System.IO.File]::WriteAllText($targetScript, $docsJson, $Utf8NoBomEncoding)

if (Test-Path $templatePath) {
    Copy-Item ".agent\assets\*" $portalDir -Force
    Copy-Item (Join-Path $portalDir "template.html") (Join-Path $portalDir "index.html") -Force
    Write-Host "Success: Portal built with Full Recursive Sync v5.1.0."
}

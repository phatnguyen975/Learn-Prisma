class CategoryTest {
  [string]$baseUrl
  [string]$rootPath
  [string]$outputDir

  CategoryTest([string]$baseUrl) {
    $this.baseUrl = $baseUrl
    $this.rootPath = Split-Path -Parent $PSCommandPath
    $this.outputDir = Join-Path $this.rootPath "response\category"

    if (-not (Test-Path $this.outputDir)) {
      New-Item -ItemType Directory -Path $this.outputDir | Out-Null
    }
  }

  [void] ShowResponse([string]$response, [string]$outputFile) {
    try {
      # Convert raw JSON to object
      $parsed = $response | ConvertFrom-Json
      # Pretty print JSON
      $pretty = $parsed | ConvertTo-Json -Depth 5

      # Show on terminal
      Write-Host "`n$pretty" -ForegroundColor Green

      # Save pretty JSON to file
      $pretty | Out-File -FilePath $outputFile -Encoding utf8
    }
    catch {
      Write-Host "`n$response" -ForegroundColor Green
      $response | Out-File -FilePath $outputFile -Encoding utf8
    }

    $relativePath = (Resolve-Path $outputFile).Path.Substring($this.rootPath.Length + 1)
    Write-Host "`n✅ Response saved to $relativePath" -ForegroundColor Yellow
  }

  ##############################################
  # [POST] /api/categories
  ##############################################
  [void] CreateCategory() {
    Write-Host "`n--- Create Category ---"
    $name = Read-Host "Enter category name"

    $data = @{ name = $name } | ConvertTo-Json

    $url = "$($this.baseUrl)/categories"

    Write-Host "`n📡 POST $url" -ForegroundColor Yellow

    $response = curl -s -X POST $url `
      -H "Content-Type: application/json" `
      -d $data

    $outputFile = Join-Path $this.outputDir "createCategory.json"
    $this.ShowResponse($response, $outputFile)
  }

  ##############################################
  # [GET] /api/categories
  ##############################################
  [void] GetCategories() {
    Write-Host "`n--- Get All Categories ---"

    $url = "$($this.baseUrl)/categories"

    Write-Host "`n📡 GET $url" -ForegroundColor Yellow

    $response = curl -s -X GET $url

    $outputFile = Join-Path $this.outputDir "getCategories.json"
    $this.ShowResponse($response, $outputFile)
  }

  ##############################################
  # [GET] /api/categories/:id
  ##############################################
  [void] GetCategoryById() {
    Write-Host "`n--- Get Category By ID ---"
    $id = Read-Host "Enter category ID"

    $url = "$($this.baseUrl)/categories/$id"

    Write-Host "`n📡 GET $url" -ForegroundColor Yellow

    $response = curl -s -X GET $url

    $outputFile = Join-Path $this.outputDir "getCategoryById.json"
    $this.ShowResponse($response, $outputFile)
  }

  ##############################################
  # [PUT] /api/categories/:id
  ##############################################
  [void] UpdateCategory() {
    Write-Host "`n--- Update Category ---"

    $id = Read-Host "Enter category ID"
    $name = Read-Host "Enter new name"

    if (-not $name) {
      Write-Host "❌ No fields to update"
      return
    }

    $data = @{ name = $name } | ConvertTo-Json
    $url = "$($this.baseUrl)/categories/$id"

    Write-Host "`n📡 PUT $url" -ForegroundColor Yellow

    $response = curl -s -X PUT $url `
      -H "Content-Type: application/json" `
      -d $data

    $outputFile = Join-Path $this.outputDir "updateCategory.json"
    $this.ShowResponse($response, $outputFile)
  }

  ##############################################
  # [DELETE] /api/categories/:id
  ##############################################
  [void] DeleteCategory() {
    Write-Host "`n--- Delete Category ---"
    $id = Read-Host "Enter category ID"

    $url = "$($this.baseUrl)/categories/$id"

    Write-Host "`n📡 DELETE $url" -ForegroundColor Yellow

    $response = curl -s -X DELETE $url

    $outputFile = Join-Path $this.outputDir "deleteCategory.json"
    $this.ShowResponse($response, $outputFile)
  }

  ##############################################
  # MAIN MENU
  ##############################################
  [void] Run() {
    Write-Host "--- Category API Tests ---"
    Write-Host "[1] Create Category"
    Write-Host "[2] Get All Categories"
    Write-Host "[3] Get Category By ID"
    Write-Host "[4] Update Category"
    Write-Host "[5] Delete Category"

    $choice = Read-Host "Select a test"

    switch ($choice) {
      1 { $this.CreateCategory() }
      2 { $this.GetCategories() }
      3 { $this.GetCategoryById() }
      4 { $this.UpdateCategory() }
      5 { $this.DeleteCategory() }
      default { Write-Host "❌ Invalid choice" }
    }
  }
}

$baseUrl = "http://localhost:3000/api"
$tester = [CategoryTest]::new($baseUrl)
$tester.Run()

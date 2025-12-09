class ProductTest {
  [string]$baseUrl
  [string]$rootPath
  [string]$outputDir

  ProductTest([string]$baseUrl) {
    $this.baseUrl = $baseUrl
    $this.rootPath = Split-Path -Parent $PSCommandPath
    $this.outputDir = Join-Path $this.rootPath "response\product"

    if (-not (Test-Path $this.outputDir)) {
      New-Item -ItemType Directory -Path $this.outputDir | Out-Null
    }
  }

  [void] ShowResponse([string]$response, [string]$outputFile) {
    try {
      $parsed = $response | ConvertFrom-Json
      $pretty = $parsed | ConvertTo-Json -Depth 10
      Write-Host "`n$pretty" -ForegroundColor Green
      $pretty | Out-File -FilePath $outputFile -Encoding utf8
    }
    catch {
      Write-Host "`n$response" -ForegroundColor Green
      $response | Out-File -FilePath $outputFile -Encoding utf8
    }

    $relativePath = (Resolve-Path $outputFile).Path.Substring($this.rootPath.Length + 1)
    Write-Host "`n✅ Response saved to $relativePath" -ForegroundColor Yellow
  }

  ##################################################
  # [POST] /api/products
  ##################################################
  [void] CreateProduct() {
    Write-Host "`n--- Create Product ---"

    $name = Read-Host "Enter name"
    $description = Read-Host "Enter description (optional)"
    $price = Read-Host "Enter price"
    $currency = Read-Host "Enter currency (optional)"
    $quantity = Read-Host "Enter quantity (optional)"
    $categoryId = Read-Host "Enter category ID"

    $body = @{}

    if ($name) { $body.name = $name }
    if ($description) { $body.description = $description }
    if ($price) { $body.price = [decimal]$price }
    if ($currency) { $body.currency = $currency }
    if ($quantity) { $body.quantity = [int]$quantity }
    if ($categoryId) { $body.categoryId = [int]$categoryId }

    $data = $body | ConvertTo-Json

    $url = "$($this.baseUrl)/products"

    Write-Host "`n📡 POST $url" -ForegroundColor Yellow

    $response = curl -s -X POST $url `
      -H "Content-Type: application/json" `
      -d $data

    $outputFile = Join-Path $this.outputDir "createProduct.json"
    $this.ShowResponse($response, $outputFile)
  }

  ##################################################
  # [GET] /api/products
  ##################################################
  [void] GetProducts() {
    Write-Host "`n--- Get All Products ---"

    $url = "$($this.baseUrl)/products"

    Write-Host "📡 GET $url" -ForegroundColor Yellow

    $response = curl -s -X GET $url

    $outputFile = Join-Path $this.outputDir "getProducts.json"
    $this.ShowResponse($response, $outputFile)
  }

  ##################################################
  # [GET] /api/products/:id
  ##################################################
  [void] GetProductById() {
    Write-Host "`n--- Get Product By ID ---"
    $id = Read-Host "Enter product ID"

    $url = "$($this.baseUrl)/products/$id"

    Write-Host "📡 GET $url" -ForegroundColor Yellow

    $response = curl -s -X GET $url

    $outputFile = Join-Path $this.outputDir "getProductById.json"
    $this.ShowResponse($response, $outputFile)
  }

  ##################################################
  # [PUT] /api/products/:id
  ##################################################
  [void] UpdateProduct() {
    Write-Host "`n--- Update Product ---"

    $id = Read-Host "Enter product ID"
    $name = Read-Host "Enter new name"
    $description = Read-Host "Enter new description (optional)"
    $price = Read-Host "Enter new price"
    $currency = Read-Host "Enter new currency (optional)"
    $quantity = Read-Host "Enter new quantity (optional)"
    $categoryId = Read-Host "Enter new category ID"

    $body = @{}

    if ($name) { $body.name = $name }
    if ($description) { $body.description = $description }
    if ($price) { $body.price = [decimal]$price }
    if ($currency) { $body.currency = $currency }
    if ($quantity) { $body.quantity = [int]$quantity }
    if ($categoryId) { $body.categoryId = [int]$categoryId }

    if ($body.Count -eq 0) {
      Write-Host "❌ No fields to update!"
      return
    }

    $data = $body | ConvertTo-Json

    $url = "$($this.baseUrl)/products/$id"

    Write-Host "`n📡 PUT $url" -ForegroundColor Yellow

    $response = curl -s -X PUT $url `
      -H "Content-Type: application/json" `
      -d $data

    $outputFile = Join-Path $this.outputDir "updateProduct.json"
    $this.ShowResponse($response, $outputFile)
  }

  ##################################################
  # [DELETE] /api/products/:id
  ##################################################
  [void] DeleteProduct() {
    Write-Host "`n--- Delete Product ---"
    $id = Read-Host "Enter product ID"

    $url = "$($this.baseUrl)/products/$id"

    Write-Host "📡 DELETE $url" -ForegroundColor Yellow

    $response = curl -s -X DELETE $url

    $outputFile = Join-Path $this.outputDir "deleteProduct.json"
    $this.ShowResponse($response, $outputFile)
  }

  ##################################################
  # [GET] /api/products/category/:categoryId
  ##################################################
  [void] GetProductsByCategory() {
    Write-Host "`n--- Get Products By Category ID ---"
    $id = Read-Host "Enter category ID"

    $url = "$($this.baseUrl)/products/category/$id"

    Write-Host "📡 GET $url" -ForegroundColor Yellow

    $response = curl -s -X GET $url

    $outputFile = Join-Path $this.outputDir "getProductsByCategory.json"
    $this.ShowResponse($response, $outputFile)
  }

  ##################################################
  # MENU
  ##################################################
  [void] Run() {
    Write-Host "--- Product API Tests ---"
    Write-Host "[1] Create Product"
    Write-Host "[2] Get All Products"
    Write-Host "[3] Get Product By ID"
    Write-Host "[4] Update Product"
    Write-Host "[5] Delete Product"
    Write-Host "[6] Get Products By Category ID"

    $choice = Read-Host "Select a test"

    switch ($choice) {
      1 { $this.CreateProduct() }
      2 { $this.GetProducts() }
      3 { $this.GetProductById() }
      4 { $this.UpdateProduct() }
      5 { $this.DeleteProduct() }
      6 { $this.GetProductsByCategory() }
      default { Write-Host "❌ Invalid choice" }
    }
  }
}

$baseUrl = "http://localhost:3000/api"
$tester = [ProductTest]::new($baseUrl)
$tester.Run()

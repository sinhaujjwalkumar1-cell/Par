class ColorVisualizer {
    constructor() {
        this.currentColor = '#FF6B6B';
        this.selectedWall = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setDefaultColors();
    }

    setupEventListeners() {
        // Color boxes selection
        document.querySelectorAll('.color-box').forEach(box => {
            box.addEventListener('click', (e) => {
                this.selectColor(e.target.dataset.color);
                e.target.classList.add('selected');
            });
        });

        // Custom color picker
        document.getElementById('customColor').addEventListener('input', (e) => {
            this.selectColor(e.target.value);
        });

        // Wall selection
        document.querySelectorAll('.wall').forEach(wall => {
            wall.addEventListener('click', (e) => {
                this.paintWall(e.target);
            });
        });

        // Photo upload
        document.getElementById('photoUpload').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });
    }

    selectColor(color) {
        this.currentColor = color;
        
        // Update selected color boxes
        document.querySelectorAll('.color-box').forEach(box => {
            box.classList.remove('selected');
            if (box.dataset.color === color) {
                box.classList.add('selected');
            }
        });
        
        // Update custom color picker
        document.getElementById('customColor').value = color;
        
        console.log('Selected color:', color);
    }

    paintWall(wallElement) {
        if (this.currentColor) {
            wallElement.style.backgroundColor = this.currentColor;
            this.saveDesign();
        }
    }

    setDefaultColors() {
        // Set default wall colors
        const defaultColors = {
            leftWall: '#FFFFFF',
            centerWall: '#FFFFFF', 
            rightWall: '#FFFFFF'
        };

        Object.keys(defaultColors).forEach(wallId => {
            const wall = document.getElementById(wallId);
            if (wall) {
                wall.style.backgroundColor = defaultColors[wallId];
            }
        });
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            const canvas = document.getElementById('roomCanvas');
            const ctx = canvas.getContext('2d');

            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    canvas.style.display = 'block';
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    
                    // Add color overlay functionality to image
                    canvas.addEventListener('click', (e) => {
                        this.addColorToImage(e, ctx, canvas);
                    }.bind(this));
                }.bind(this);
                img.src = e.target.result;
            }.bind(this);
            reader.readAsDataURL(file);
        }
    }

    addColorToImage(event, ctx, canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Create a temporary canvas for color overlay
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        
        // Draw original image
        tempCtx.drawImage(canvas, 0, 0);
        
        // Add color overlay with transparency
        tempCtx.globalCompositeOperation = 'source-atop';
        tempCtx.fillStyle = this.currentColor + '80'; // 50% transparency
        tempCtx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw back to main canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);
    }

    saveDesign() {
        const gallery = document.getElementById('designGallery');
        
        // Create design preview
        const designItem = document.createElement('div');
        designItem.className = 'design-item';
        
        const preview = document.createElement('div');
        preview.className = 'design-preview';
        preview.style.background = `linear-gradient(45deg, ${document.getElementById('leftWall').style.backgroundColor}, ${document.getElementById('centerWall').style.backgroundColor}, ${document.getElementById('rightWall').style.backgroundColor})`;
        
        const timestamp = new Date().toLocaleString();
        
        designItem.innerHTML = `
            <div class="design-preview" style="background: linear-gradient(45deg, ${document.getElementById('leftWall').style.backgroundColor}, ${document.getElementById('centerWall').style.backgroundColor}, ${document.getElementById('rightWall').style.backgroundColor})"></div>
            <p>Design: ${timestamp}</p>
            <button onclick="this.parentElement.remove()">Delete</button>
        `;
        
        gallery.appendChild(designItem);
    }
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ColorVisualizer();
});

// Additional helper functions
function resetDesign() {
    const visualizer = new ColorVisualizer();
    visualizer.setDefaultColors();
    document.getElementById('designGallery').innerHTML = '';
}

function downloadDesign() {
    alert('Pro version mein ye feature available hoga!');
}

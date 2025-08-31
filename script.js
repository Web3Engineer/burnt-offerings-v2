// Burnt Offerings Website JavaScript
// Contact info storage variable
let contactInfo = null;

// Product data - Easy for Jean to update
const products = [
    {
        id: 1,
        title: "Lichtenberg Chess Board",
        price: 185,
        image: "inventory_images/Chess-Board.png",
        description: "A handcrafted chess board featuring intricate Lichtenberg fractal patterns that create natural boundaries between the squares. The electric burn patterns add character and uniqueness to this classic game board."
    },
    {
        id: 2,
        title: "Child's Lightning Chair",
        price: 125,
        image: "inventory_images/Child-Chair.png",
        description: "A charming child-sized chair with delicate fractal burn patterns dancing across the seat and backrest. Perfect for a young one's room, combining safety with the beauty of electric wood burning art."
    },
    {
        id: 3,
        title: "High-Back Bar Chair",
        price: 285,
        image: "inventory_images/High-Back-Bar-Chair.png",
        description: "An elegant high-back bar chair showcasing dramatic Lichtenberg patterns flowing vertically along the backrest. The electric burns create striking contrast against the natural wood grain."
    },
    {
        id: 4,
        title: "Fractal Lazy Susan",
        price: 95,
        image: "inventory_images/Lazy-Susan.png",
        description: "A beautiful rotating lazy susan with lightning patterns radiating from the center like captured energy. Perfect for dining tables or serving areas, combining functionality with artistic flair."
    },
    {
        id: 5,
        title: "Long Serving Bowl",
        price: 145,
        image: "inventory_images/Long-Bowl-Top.png",
        description: "An elongated serving bowl featuring flowing Lichtenberg patterns that follow the natural curves of the wood. The electric burns create organic channels that enhance the bowl's elegant form."
    },
    {
        id: 6,
        title: "Queen Size Headboard",
        price: 485,
        image: "inventory_images/Queen-Size-Headboard.png",
        description: "A stunning queen-size headboard with bold fractal patterns spreading across the entire surface like frozen lightning. This centerpiece transforms any bedroom into an electrifying sanctuary."
    },
    {
        id: 7,
        title: "Lightning Rolling Pin",
        price: 65,
        image: "inventory_images/Rolling-Pin.png",
        description: "A unique kitchen rolling pin with delicate Lichtenberg patterns spiraling around its surface. Food-safe finish makes this both a functional tool and a conversation piece for any kitchen."
    },
    {
        id: 8,
        title: "Round Serving Bowl",
        price: 125,
        image: "inventory_images/Round-Bowl-Top.png",
        description: "A perfectly round serving bowl with fractal patterns radiating from center to rim like electric ripples. The burn patterns create natural divisions perfect for serving multiple items."
    },
    {
        id: 9,
        title: "Expandable Round Table",
        price: 1250,
        image: "inventory_images/Round-Table-Two-Leafs.png",
        description: "A magnificent round dining table with two removable leaves, featuring Lichtenberg patterns that flow seamlessly across all sections. The electric burns create a unified design that expands with the table."
    },
    {
        id: 10,
        title: "Electric Side Table",
        price: 225,
        image: "inventory_images/Side-Table.png",
        description: "A compact side table with dramatic lightning patterns cascading down the legs and across the surface. Perfect accent piece that brings electric energy to any room."
    },
    {
        id: 11,
        title: "Three-Drawer Dresser",
        price: 685,
        image: "inventory_images/Three-Drawer-Dresser.png",
        description: "A spacious three-drawer dresser with coordinating Lichtenberg patterns across all surfaces. Each drawer features unique fractal designs that complement the overall electric theme."
    },
    {
        id: 12,
        title: "Fractal Tissue Box",
        price: 45,
        image: "inventory_images/Tissue-Box.png",
        description: "A decorative tissue box cover with delicate lightning patterns wrapping around all sides. Transforms an everyday item into a piece of functional art for any room."
    },
    {
        id: 13,
        title: "Lightning Wall Clock",
        price: 135,
        image: "inventory_images/Wall-Clock.png",
        description: "A striking wall clock with Lichtenberg patterns radiating outward like electric bolts frozen in time. The fractal burns create natural hour markers in this unique timepiece."
    },
    {
        id: 14,
        title: "Electric Wine Rack",
        price: 195,
        image: "inventory_images/Wine-Rack-Front.png",
        description: "An elegant wine rack featuring lightning patterns that flow between the bottle slots like captured energy. Perfect for displaying your wine collection with electrifying style."
    },
    {
        id: 15,
        title: "Wooden Heart Keepsake",
        price: 35,
        image: "inventory_images/Wooden-Heart.png",
        description: "A charming wooden heart with delicate fractal patterns flowing like veins of lightning. Perfect as a decorative piece or meaningful gift, this keepsake captures love's electric energy in wood."
    }
];

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('burntOfferingsCart')) || [];

// Carousel variables
let currentSlide = 0;
let isTransitioning = false;

// Lightning effects variables
let lightningContainer;
let lastMouseX = 0;
let lastMouseY = 0;
let lightningThrottle = false;

// Initialize website
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Burnt Offerings website initializing...');
    
    // Initialize all components
    initializeProductGrid();
    updateCartDisplay();
    setupParallax();
    setupNavigation();
    setupContactForm();
    setupLightningEffects();
    
    // Show content smoothly after initialization
    setTimeout(() => {
        document.body.classList.add('loaded');
        console.log('✨ Content displayed smoothly');
    }, 100);
    
    console.log('✅ Website initialization complete');
});

// Parallax effect
function setupParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxBg = document.querySelector('.parallax-bg');
        
        if (parallaxBg) {
            const speed = scrolled * 0.5;
            parallaxBg.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Navigation functionality
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });
}

// Product Grid functionality
function initializeProductGrid() {
    console.log('🏗️ Initializing product grid...');
    
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    // Create product tiles
    products.forEach(product => {
        const tile = document.createElement('div');
        tile.className = 'product-tile';
        tile.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" />
                <div class="product-overlay">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                <p class="product-description">${product.description}</p>
            </div>
        `;
        productsGrid.appendChild(tile);
    });
    
    console.log('✅ Product grid initialized with', products.length, 'products');
}


function scrollToGallery() {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        gallerySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Shopping cart functionality
function addToCart(productId) {
    console.log('🛒 Adding product to cart:', productId);
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
    
    // Show feedback
    showNotification(`${product.title} added to cart!`);
}

function removeFromCart(productId) {
    console.log('🗑️ Removing product from cart:', productId);
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
}

function clearCart() {
    console.log('🧹 Clearing entire cart');
    cart = [];
    saveCart();
    updateCartDisplay();
    showNotification('Cart cleared!');
}

function saveCart() {
    localStorage.setItem('burntOfferingsCart', JSON.stringify(cart));
    console.log('💾 Cart saved to localStorage');
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Update cart items
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" />
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            Remove
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log('💳 Proceeding to checkout with total:', total);
    
    // Close cart sidebar
    toggleCart();
    
    // Call credit card function with total amount
    if (typeof creditCard === 'function') {
        creditCard(total);
    } else {
        console.error('❌ Credit card function not available');
        showNotification('Payment system unavailable. Please try again later.');
    }
}

// Contact form functionality
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📞 Contact form submitted');
            
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Store contact info
            contactInfo = {
                phone: phone,
                message: message,
                timestamp: new Date().toISOString()
            };
            
            console.log('📋 Contact info saved:', contactInfo);
            
            // Show success message
            showNotification('Thank you! Jean will contact you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Notification system
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--secondary-color);
        color: var(--dark-wood);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Keyboard navigation for cart
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar && cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});

// Lightning Effects System
function setupLightningEffects() {
    lightningContainer = document.getElementById('lightning-container');
    if (!lightningContainer) return;
    
    console.log('⚡ Setting up lightning effects...');
    
    // Mouse movement handler
    document.addEventListener('mousemove', handleLightningMove);
    
    // Touch movement handler for mobile
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            handleLightningMove({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        }
    });
    
    // Click/tap handler for instant lightning
    document.addEventListener('click', function(e) {
        createLightningBurst(e.clientX, e.clientY);
    });
    
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            createLightningBurst(touch.clientX, touch.clientY);
        }
    });
    
    console.log('⚡ Lightning effects ready!');
}

function handleLightningMove(e) {
    if (lightningThrottle) return;
    
    const currentX = e.clientX;
    const currentY = e.clientY;
    
    // Calculate movement distance
    const deltaX = currentX - lastMouseX;
    const deltaY = currentY - lastMouseY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Only create lightning if there's significant movement
    if (distance > 15) {
        createLightningStreak(currentX, currentY, lastMouseX, lastMouseY);
        
        // Throttle lightning creation
        lightningThrottle = true;
        setTimeout(() => {
            lightningThrottle = false;
        }, 100);
    }
    
    lastMouseX = currentX;
    lastMouseY = currentY;
}

function createLightningStreak(x, y, fromX, fromY) {
    if (!lightningContainer) return;
    
    // Calculate angle and length
    const deltaX = x - fromX;
    const deltaY = y - fromY;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    
    // Create main lightning streak
    const streak = document.createElement('div');
    streak.className = 'lightning-streak';
    streak.style.left = fromX + 'px';
    streak.style.top = fromY + 'px';
    streak.style.height = length + 'px';
    streak.style.transform = `rotate(${angle + 90}deg)`;
    
    lightningContainer.appendChild(streak);
    
    // Create random branches
    const numBranches = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0;
    
    for (let i = 0; i < numBranches; i++) {
        setTimeout(() => {
            createLightningBranch(fromX, fromY, length, angle);
        }, Math.random() * 200);
    }
    
    // Remove streak after animation
    setTimeout(() => {
        if (streak.parentNode) {
            streak.parentNode.removeChild(streak);
        }
    }, 800);
}

function createLightningBranch(originX, originY, parentLength, parentAngle) {
    if (!lightningContainer) return;
    
    // Random position along parent streak
    const branchPosition = Math.random() * 0.7 + 0.1; // 10% to 80% along parent
    const branchLength = parentLength * (Math.random() * 0.4 + 0.2); // 20% to 60% of parent length
    
    // Random angle deviation from parent
    const angleDeviation = (Math.random() - 0.5) * 120; // ±60 degrees
    const branchAngle = parentAngle + angleDeviation;
    
    // Calculate branch start position
    const branchStartX = originX + Math.cos((parentAngle - 90) * Math.PI / 180) * parentLength * branchPosition;
    const branchStartY = originY + Math.sin((parentAngle - 90) * Math.PI / 180) * parentLength * branchPosition;
    
    const branch = document.createElement('div');
    branch.className = 'lightning-branch';
    branch.style.left = branchStartX + 'px';
    branch.style.top = branchStartY + 'px';
    branch.style.height = branchLength + 'px';
    branch.style.setProperty('--branch-angle', branchAngle + 90 + 'deg');
    branch.style.transform = `rotate(${branchAngle + 90}deg)`;
    
    lightningContainer.appendChild(branch);
    
    // Remove branch after animation
    setTimeout(() => {
        if (branch.parentNode) {
            branch.parentNode.removeChild(branch);
        }
    }, 600);
}

function createLightningBurst(x, y) {
    if (!lightningContainer) return;
    
    // Create multiple streaks radiating from click point
    const numStreaks = Math.floor(Math.random() * 4) + 3; // 3-6 streaks
    
    for (let i = 0; i < numStreaks; i++) {
        setTimeout(() => {
            const angle = (360 / numStreaks) * i + Math.random() * 30 - 15; // Slight randomization
            const length = Math.random() * 80 + 40; // 40-120px length
            
            const streak = document.createElement('div');
            streak.className = 'lightning-streak';
            streak.style.left = x + 'px';
            streak.style.top = y + 'px';
            streak.style.height = length + 'px';
            streak.style.transform = `rotate(${angle}deg)`;
            
            lightningContainer.appendChild(streak);
            
            // Create branches for burst streaks too
            if (Math.random() > 0.6) {
                setTimeout(() => {
                    createLightningBranch(x, y, length, angle - 90);
                }, Math.random() * 100);
            }
            
            // Remove streak after animation
            setTimeout(() => {
                if (streak.parentNode) {
                    streak.parentNode.removeChild(streak);
                }
            }, 800);
        }, i * 50); // Stagger the creation
    }
}

// Clean up old lightning elements periodically
setInterval(() => {
    if (lightningContainer && lightningContainer.children.length > 20) {
        // Remove oldest elements if too many accumulate
        const children = Array.from(lightningContainer.children);
        children.slice(0, 10).forEach(child => {
            if (child.parentNode) {
                child.parentNode.removeChild(child);
            }
        });
    }
}, 2000);



console.log('🎨 Burnt Offerings JavaScript loaded successfully!');

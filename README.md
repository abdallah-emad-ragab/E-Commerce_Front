# 🛍️ ShopZone - Full-Stack E-Commerce Platform

A modern, responsive e-commerce application built with React, TypeScript, and Laravel. Features user authentication, shopping cart, wishlist, product catalog, and order management.

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Bootstrap 5** - Responsive UI components
- **Axios** - HTTP client for API calls

### Backend
- **Laravel** - PHP framework for robust backend
- **JSON Server** - Mock API for development
- **MySQL** - Database (production)

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog** - Browse products by categories
- **Advanced Search** - Find products quickly
- **Product Details** - Comprehensive product information
- **Shopping Cart** - Add, remove, and manage cart items
- **Wishlist** - Save favorite products

### 👤 User Management
- **User Registration** - Create new accounts
- **User Login** - Secure authentication
- **Profile Management** - Update personal information
- **Order History** - Track past purchases

### 🛡️ Security & Performance
- **Protected Routes** - Authentication-based access control
- **Form Validation** - Client-side validation with Zod
- **Error Handling** - Comprehensive error management
- **Loading States** - Smooth user experience with loaders
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure

```
E-Commerce-FullStack/
├── E-Commerce-Front/          # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── common/        # Layout components (Header, Footer)
│   │   │   ├── eCommerce/     # E-commerce specific components
│   │   │   ├── Auth/          # Authentication components
│   │   │   └── feedback/      # Loading and error components
│   │   ├── pages/             # Page components
│   │   ├── layouts/           # Layout wrappers
│   │   ├── store/             # Redux store and slices
│   │   ├── hooks/             # Custom React hooks
│   │   └── types/             # TypeScript type definitions
│   ├── public/                # Static assets
│   └── package.json
│
└── E-Commerce-Back/           # Laravel Backend
    ├── app/                   # Laravel application code
    ├── config/                # Configuration files
    ├── database/              # Database migrations and seeders
    ├── routes/                # API routes
    ├── resources/             # Views and assets
    └── composer.json
```

## 🛠️ Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PHP** (v8.1 or higher) for Laravel backend
- **Composer** for PHP dependencies
- **MySQL** for database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-Commerce-FullStack
   ```

2. **Setup Frontend**
   ```bash
   cd E-Commerce-Front
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd ../E-Commerce-Back
   composer install
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database Setup**
   ```bash
   # Create database and update .env file
   php artisan migrate
   php artisan db:seed
   ```

### Development

1. **Start Backend API**
   ```bash
   cd E-Commerce-Back
   php artisan serve
   ```
   API will be available at `http://localhost:8000`

2. **Start Frontend**
   ```bash
   cd E-Commerce-Front
   npm run dev
   ```
   Application will be available at `http://localhost:5173`

## 📜 Available Scripts

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Scripts
```bash
php artisan serve           # Start Laravel development server
php artisan migrate         # Run database migrations
php artisan db:seed         # Seed database with sample data
php artisan make:model      # Create new model
php artisan make:controller # Create new controller
```

## 🔌 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/categories` - Get all categories

### Cart & Orders
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/{id}` - Update cart item
- `DELETE /api/cart/{id}` - Remove cart item
- `POST /api/orders` - Create new order

### User
- `GET /api/user` - Get user profile
- `PUT /api/user` - Update user profile
- `GET /api/orders` - Get user's orders

## 🎨 Design System

### Colors
- **Primary**: Dark Navy (#111827)
- **Accent**: Yellow (#FACC15)
- **Background**: Light Gray (#F9FAFB)
- **Text**: Dark Gray (#111827)

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weight for readability

### Components
- **Cards**: Shadowed containers with rounded corners
- **Buttons**: Consistent styling with hover effects
- **Forms**: Bootstrap-based with custom validation
- **Navigation**: Fixed header with smooth scroll behavior

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use meaningful commit messages
- Write tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [Your GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React community for excellent documentation
- Bootstrap team for the UI framework
- Laravel community for the backend framework
- All contributors and supporters

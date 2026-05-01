const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.menuItem.deleteMany()
  await prisma.category.deleteMany()
  await prisma.setting.deleteMany()

  // Categories
  const categoriesData = [
    { name: 'APPETIZERS & SIDES', order: 1 },
    { name: 'LOADED FRIES', order: 2 },
    { name: 'SMASH BURGERS', order: 3 },
    { name: 'BUTTER BURGER', order: 4 },
    { name: 'FRIED CHICKEN BURGER', order: 5 },
    { name: 'STEAK SANDWICH', order: 6 },
    { name: 'HOTDOG', order: 7 },
    { name: 'WRAPS', order: 8 },
    { name: 'DRINKS', order: 9 },
    { name: 'ADD-ONS', order: 10 },
  ]

  const createdCategories = await Promise.all(
    categoriesData.map(c => prisma.category.create({ data: c }))
  )

  const getCategoryId = (name) => createdCategories.find(c => c.name === name)?.id

  // Menu Items
  const menuItemsData = [
    // APPETIZERS
    { categoryId: getCategoryId('APPETIZERS & SIDES'), name: 'FRIES BAG', price: 3, description: '', imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=600&auto=format&fit=crop' },
    { categoryId: getCategoryId('APPETIZERS & SIDES'), name: 'CURLY FRIES', price: 4, description: '', imageUrl: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=600&auto=format&fit=crop' },
    { categoryId: getCategoryId('APPETIZERS & SIDES'), name: 'CHICKEN TENDERS (4PCS)', price: 6, description: '', imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600&auto=format&fit=crop' },
    { categoryId: getCategoryId('APPETIZERS & SIDES'), name: 'WINGS (6 PCS)', price: 4.5, description: '', imageUrl: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=600&auto=format&fit=crop' },
    { categoryId: getCategoryId('APPETIZERS & SIDES'), name: 'MOZZARELLA STICKS (5PCS)', price: 5, description: '', imageUrl: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?q=80&w=600&auto=format&fit=crop' },
    { categoryId: getCategoryId('APPETIZERS & SIDES'), name: 'JALAPEÑO BITES (5 PCS)', price: 5, description: '', imageUrl: 'https://images.unsplash.com/photo-1627662236973-4fd8fa7815b3?q=80&w=600&auto=format&fit=crop' },
    { categoryId: getCategoryId('APPETIZERS & SIDES'), name: 'ONION RINGS (10 PCS)', price: 4, description: '', imageUrl: 'https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=600&auto=format&fit=crop' },
    
    // LOADED FRIES
    { categoryId: getCategoryId('LOADED FRIES'), name: 'CRISPY CHICKEN', price: 6, description: '', imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=600&auto=format&fit=crop' },
    { categoryId: getCategoryId('LOADED FRIES'), name: 'BEEF CRUMBLE', price: 7, description: '', imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=600&auto=format&fit=crop' },

    // SMASH BURGERS
    { categoryId: getCategoryId('SMASH BURGERS'), name: 'CLASSIC SMASH - SINGLE', price: 6, description: 'INCLUDES MADBUNS SAUCE, CHEESE & FREE TOPPINGS', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop' },
    { categoryId: getCategoryId('SMASH BURGERS'), name: 'CLASSIC SMASH - DOUBLE', price: 8, description: 'INCLUDES MADBUNS SAUCE, CHEESE & FREE TOPPINGS', imageUrl: 'https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=600&auto=format&fit=crop' },
    { categoryId: getCategoryId('SMASH BURGERS'), name: 'CLASSIC SMASH - TRIPLE', price: 10, description: 'INCLUDES MADBUNS SAUCE, CHEESE & FREE TOPPINGS', imageUrl: 'https://images.unsplash.com/photo-1594212686866-51d0232598be?q=80&w=600&auto=format&fit=crop' },

    // BUTTER BURGER
    { categoryId: getCategoryId('BUTTER BURGER'), name: 'BUTTER BURGER', price: 10, description: 'MUSHROOM, BUTTER, EMMENTAL CHEESE, ROCCA, MAYO', imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=600&auto=format&fit=crop' },

    // FRIED CHICKEN BURGER
    { categoryId: getCategoryId('FRIED CHICKEN BURGER'), name: 'FRIED CHICKEN BURGER', price: 8, description: 'HAND BREADED, LETTUCE MAYO, CHEDDAR, HOT HONEY, HOMESTYLE SLAW, DILL PICKLES, FERMENTED ONIONS', imageUrl: 'https://images.unsplash.com/photo-1615486171448-4fb324aa87eb?q=80&w=600&auto=format&fit=crop' },

    // STEAK SANDWICH
    { categoryId: getCategoryId('STEAK SANDWICH'), name: 'STEAK SANDWICH', price: 14, description: 'THIN-SLICED STEAK WITH MELTED PROVOLONE & SAUTÉED ONIONS, SERVED IN OUR SUB.', imageUrl: 'https://images.unsplash.com/photo-1652438517223-1d0ebcdb2e5f?q=80&w=600&auto=format&fit=crop' },

    // HOTDOG
    { categoryId: getCategoryId('HOTDOG'), name: 'HOTDOG', price: 6, description: 'KETCHUP, MUSTARD, SAUTÉED ONIONS, CHEDDAR SAUCE', imageUrl: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=600&auto=format&fit=crop' },

    // WRAPS
    { categoryId: getCategoryId('WRAPS'), name: 'CHICKEN STRIPS WRAP', price: 6, description: 'FRIED CHICKEN STRIPS, TOMATO, LETTUCE, SAUCE OF YOUR CHOICE', imageUrl: 'https://images.unsplash.com/photo-1626844131082-256783844137?q=80&w=600&auto=format&fit=crop' },

    // DRINKS
    { categoryId: getCategoryId('DRINKS'), name: 'REGULAR SOFT DRINKS', price: 1, description: '', imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop' },
    { categoryId: getCategoryId('DRINKS'), name: 'PREMIUM SOFT DRINKS', price: 3, description: '', imageUrl: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?q=80&w=600&auto=format&fit=crop' },
    { categoryId: getCategoryId('DRINKS'), name: 'HOMEMADE ICED TEA', price: 1, description: '', imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&auto=format&fit=crop' },
    { categoryId: getCategoryId('DRINKS'), name: 'MADSHAKE', price: 4, description: '', imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop' },

    // ADD-ONS
    { categoryId: getCategoryId('ADD-ONS'), name: 'CHEDDAR PATTY', price: 2.00, description: '', imageUrl: null },
    { categoryId: getCategoryId('ADD-ONS'), name: 'MOZZARELLA PATTY', price: 1.50, description: '', imageUrl: null },
    { categoryId: getCategoryId('ADD-ONS'), name: 'BEEF BACON', price: 1.50, description: '', imageUrl: null },
    { categoryId: getCategoryId('ADD-ONS'), name: 'EXTRA SAUCE CUP', price: 1.00, description: '', imageUrl: null },
  ]

  for (const item of menuItemsData) {
    if (item.categoryId) {
      await prisma.menuItem.create({ data: item })
    }
  }

  // Settings
  const settingsData = [
    { key: 'phone', value: '+1234567890' },
    { key: 'whatsapp', value: '+1234567890' },
    { key: 'address', value: '123 Burger St, Food City' },
    { key: 'instagram', value: 'https://instagram.com/madbuns' },
    { key: 'homepage_text', value: 'Welcome to Madbuns! Smash Burgers, Fried Chicken, Sides, Loaded Fries, Drinks.' },
    { key: 'opening_hours', value: 'Mon - Sun: 11:00 AM - 11:00 PM' }
  ]

  for (const setting of settingsData) {
    await prisma.setting.create({ data: setting })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

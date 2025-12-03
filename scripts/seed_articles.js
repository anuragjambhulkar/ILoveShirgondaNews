const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

const uri = process.env.MONGODB_URI || 'mongodb+srv://rameshbhos96_db_user:Ql5bfboTnVvQwwP1@cluster0.mirjol4.mongodb.net/?appName=Cluster0';
const dbName = process.env.DB_NAME || 'shrigonda_news';

// Demo articles - one per category for testing
const demoArticles = [
  {
    id: uuidv4(),
    category: 'local',
    title: 'Shrigonda Community Celebrates Diwali with Grand Festival',
    content: 'The community of Shrigonda came together to celebrate Diwali with a grand festival that showcased the rich cultural heritage of the region. The festival featured traditional music, dance performances, and a spectacular fireworks display that lit up the night sky.\n\nLocal residents decorated their homes and streets with colorful rangoli designs and diyas. The festival committee organized various cultural programs throughout the day, attracting participation from all age groups. Community leaders praised the spirit of unity and togetherness displayed during the celebrations.',
    excerpt: 'Shrigonda community celebrates Diwali with traditional festivities, cultural programs, and fireworks.',
    tags: ['festival', 'diwali', 'community', 'culture'],
    image: 'https://images.unsplash.com/photo-1605731414355-e4b6bbb57b8c?w=800',
    author: 'admin',
    authorId: 'admin-123',
    status: 'published',
    views: Math.floor(Math.random() * 1000) + 500,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: uuidv4(),
    category: 'regional',
    title: 'Maharashtra Government Announces New Water Conservation Project',
    content: 'The Maharashtra government has announced a comprehensive water conservation project for the Ahmednagar region. The project aims to improve water storage capacity and promote sustainable water management practices across rural areas.\n\nThe initiative includes construction of check dams, water harvesting structures, and promotion of drip irrigation systems. Officials stated that this project will benefit thousands of farmers in the region and ensure water security during dry seasons. The project has been allocated a budget of ₹100 crores.',
    excerpt: 'Maharashtra announces ₹100 crore water conservation project for Ahmednagar region.',
    tags: ['water', 'conservation', 'government', 'agriculture'],
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    author: 'admin',
    authorId: 'admin-123',
    status: 'published',
    views: Math.floor(Math.random() * 1000) + 500,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: uuidv4(),
    category: 'national',
    title: 'India Sets New Record in Renewable Energy Production',
    content: 'India has achieved a significant milestone in renewable energy production, setting a new record for solar and wind power generation. The country\'s installed renewable energy capacity has now crossed 180 GW, making it one of the leading nations in clean energy adoption.\n\nThe Ministry of New and Renewable Energy announced that this achievement is a result of sustained efforts in promoting solar parks, wind farms, and other renewable energy projects. Experts believe that India is well on track to meet its ambitious target of 500 GW renewable energy capacity by 2030.',
    excerpt: 'India crosses 180 GW renewable energy capacity, setting new records in solar and wind power.',
    tags: ['renewable', 'energy', 'solar', 'environment'],
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    author: 'admin',
    authorId: 'admin-123',
    status: 'published',
    views: Math.floor(Math.random() * 2000) + 1000,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: uuidv4(),
    category: 'sports',
    title: 'Shrigonda Athletes Qualify for State Swimming Championship',
    content: 'Young swimmers from Shrigonda Sports Academy have qualified for the upcoming Maharashtra State Swimming Championship after impressive performances at the district-level trials. Five athletes from the academy will represent the region in various categories.\n\nCoach Ramesh Kumar expressed pride in his students\' achievements and attributed their success to dedicated training and strong support from the local community. The championship is scheduled to take place next month in Mumbai, and the athletes are preparing intensively for the competition.',
    excerpt: 'Five Shrigonda swimmers qualify for Maharashtra State Swimming Championship.',
    tags: ['sports', 'swimming', 'championship', 'athletes'],
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800',
    author: 'admin',
    authorId: 'admin-123',
    status: 'published',
    views: Math.floor(Math.random() * 800) + 400,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: uuidv4(),
    category: 'entertainment',
    title: 'Marathi Film Festival to Showcase Regional Cinema',
    content: 'A three-day Marathi Film Festival is set to begin in Ahmednagar, featuring screenings of acclaimed regional films and discussions with renowned filmmakers. The festival aims to promote Marathi cinema and provide a platform for upcoming talent in the regional film industry.\n\nThe event will include special screenings, workshops on filmmaking, and interactive sessions with directors and actors. Entry to the festival is free for students, and organizers expect a large turnout from film enthusiasts across the region.',
    excerpt: 'Three-day Marathi Film Festival to showcase regional cinema with free entry for students.',
    tags: ['cinema', 'festival', 'marathi', 'entertainment'],
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
    author: 'admin',
    authorId: 'admin-123',
    status: 'published',
    views: Math.floor(Math.random() * 600) + 300,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: uuidv4(),
    category: 'business',
    title: 'Local Cooperative Bank Reports Record Profits',
    content: 'The Shrigonda Urban Cooperative Bank has announced record profits for the financial year, attributing the success to increased loan disbursements and strong financial management. The bank reported a net profit of ₹15 crores, representing a 25% increase from the previous year.\n\nBank officials stated that the growth was driven by expansion in agricultural lending, small business loans, and digital banking services. The bank plans to open two new branches in neighboring villages and introduce new technology-driven banking solutions for customers.',
    excerpt: 'Shrigonda Cooperative Bank reports ₹15 crore profit with 25% year-over-year growth.',
    tags: ['banking', 'business', 'finance', 'profits'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    author: 'admin',
    authorId: 'admin-123',
    status: 'published',
    views: Math.floor(Math.random() * 700) + 350,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  }
];

async function seedArticles() {
  const client = new MongoClient(uri);
  
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully to MongoDB');
    
    const db = client.db(dbName);
    const newsCollection = db.collection('news');
    
    // Check if articles with these IDs already exist
    console.log('\nChecking existing articles...');
    for (const article of demoArticles) {
      const exists = await newsCollection.findOne({ 
        category: article.category,
        title: article.title 
      });
      
      if (!exists) {
        console.log(`Adding article: ${article.title} (${article.category})`);
        await newsCollection.insertOne(article);
      } else {
        console.log(`Article already exists: ${article.title}`);
      }
    }
    
    // Verify all categories have articles
    console.log('\n=== Category Article Count ===');
    const categories = ['local', 'regional', 'national', 'sports', 'entertainment', 'business'];
    for (const cat of categories) {
      const count = await newsCollection.countDocuments({ category: cat, status: 'published' });
      console.log(`${cat}: ${count} articles`);
    }
    
    console.log('\n✅ Demo articles seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding articles:', error);
  } finally {
    await client.close();
  }
}

seedArticles();

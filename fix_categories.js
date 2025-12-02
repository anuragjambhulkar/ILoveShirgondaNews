const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://rameshbhos96_db_user:Ql5bfboTnVvQwwP1@cluster0.mirjol4.mongodb.net/?appName=Cluster0';
const dbName = process.env.DB_NAME || 'shrigonda_news';

// Mapping of old categories to new standard categories
const categoryMapping = {
  'Agriculture': 'regional',
  'Crime': 'local',
  'Culture': 'local',
  'Education': 'local',
  'Infrastructure': 'local',
  'Local': 'local',
  'Sports': 'sports',
  'Weather': 'local',
  'Business': 'business',
  'Entertainment': 'entertainment',
  'National': 'national',
  'Regional': 'regional'
};

async function fixCategories() {
  const client = new MongoClient(uri);
  
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully to MongoDB');
    
    const db = client.db(dbName);
    const newsCollection = db.collection('news');
    
    // Get all articles
    const articles = await newsCollection.find({}).toArray();
    console.log(`\nFound ${articles.length} total articles`);
    
    // Count articles by current category
    const categoryCounts = {};
    articles.forEach(article => {
      const cat = article.category || 'unknown';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
    
    console.log('\n=== Current Category Distribution ===');
    Object.entries(categoryCounts).forEach(([cat, count]) => {
      console.log(`${cat}: ${count} articles`);
    });
    
    // Update articles with incorrect categories
    let updatedCount = 0;
    for (const article of articles) {
      const oldCategory = article.category;
      const newCategory = categoryMapping[oldCategory] || oldCategory.toLowerCase();
      
      // Only update if category is different
      if (oldCategory !== newCategory && ['local', 'regional', 'national', 'sports', 'entertainment', 'business'].includes(newCategory)) {
        await newsCollection.updateOne(
          { _id: article._id },
          { $set: { category: newCategory } }
        );
        console.log(`Updated: "${article.title}" from "${oldCategory}" to "${newCategory}"`);
        updatedCount++;
      }
    }
    
    console.log(`\n✅ Updated ${updatedCount} articles`);
    
    // Verify new distribution
    const updatedArticles = await newsCollection.find({}).toArray();
    const newCategoryCounts = {};
    updatedArticles.forEach(article => {
      const cat = article.category || 'unknown';
      newCategoryCounts[cat] = (newCategoryCounts[cat] || 0) + 1;
    });
    
    console.log('\n=== Updated Category Distribution ===');
    Object.entries(newCategoryCounts).forEach(([cat, count]) => {
      console.log(`${cat}: ${count} articles`);
    });
    
    console.log('\n✅ Category migration completed successfully!');
    
  } catch (error) {
    console.error('Error fixing categories:', error);
  } finally {
    await client.close();
  }
}

fixCategories();

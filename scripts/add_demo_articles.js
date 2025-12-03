const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

const uri = 'mongodb+srv://rameshbhos96_db_user:Ql5bfboTnVvQwwP1@cluster0.mirjol4.mongodb.net/shrigonda_news';

const demoArticles = [
    {
        category: 'local',
        title: 'Shrigonda Market Sees Record Turnout During Festival Season',
        content: 'The local market in Shrigonda witnessed unprecedented crowds during the recent festival season. Vendors reported a significant increase in sales, with traditional items and local produce being the main attractions. The municipal corporation has announced plans to improve market infrastructure to accommodate the growing number of visitors.\n\nLocal business owners expressed satisfaction with the turnout and hope this trend continues. The market committee is planning to organize more such events to boost local economy.',
        excerpt: 'Shrigonda local market experiences record crowds during festival season with vendors reporting increased sales.',
        tags: ['market', 'festival', 'economy', 'local business'],
        image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800'
    },
    {
        category: 'local',
        title: 'New Community Center Opens in Shrigonda',
        content: 'A state-of-the-art community center was inaugurated in Shrigonda today, providing residents with modern facilities for social gatherings, cultural events, and recreational activities. The center features a multipurpose hall, library, gymnasium, and outdoor sports facilities.\n\nLocal officials emphasized the importance of community spaces in fostering social cohesion and providing opportunities for youth development.',
        excerpt: 'Modern community center opens in Shrigonda with facilities for cultural events and recreation.',
        tags: ['community', 'infrastructure', 'development'],
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    },
    {
        category: 'regional',
        title: 'Maharashtra Announces New Agricultural Subsidy Program',
        content: 'The Maharashtra government has unveiled a comprehensive agricultural subsidy program aimed at supporting farmers across the region. The initiative includes subsidies for seeds, fertilizers, and modern farming equipment.\n\nFarmers in Ahmednagar district, including Shrigonda, are expected to benefit significantly from this program. The government has allocated substantial funds to ensure smooth implementation.',
        excerpt: 'Maharashtra government launches new agricultural subsidy program to support regional farmers.',
        tags: ['agriculture', 'government', 'subsidy', 'farmers'],
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800'
    },
    {
        category: 'regional',
        title: 'Regional Highway Expansion Project Approved',
        content: 'The state government has approved a major highway expansion project connecting Ahmednagar to neighboring districts. The project is expected to improve connectivity and boost economic development in the region.\n\nConstruction is scheduled to begin next quarter, with completion expected within two years. The improved infrastructure will benefit commuters and facilitate trade.',
        excerpt: 'State approves highway expansion project to improve regional connectivity.',
        tags: ['infrastructure', 'highway', 'development', 'transport'],
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    },
    {
        category: 'national',
        title: 'India Launches New Digital Education Initiative',
        content: 'The Government of India has launched a nationwide digital education initiative aimed at providing quality education to students in rural and semi-urban areas. The program includes distribution of tablets, internet connectivity, and digital learning content.\n\nEducation experts believe this initiative will help bridge the digital divide and provide equal opportunities to students across the country.',
        excerpt: 'India launches digital education initiative to provide quality education in rural areas.',
        tags: ['education', 'digital', 'government', 'technology'],
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'
    },
    {
        category: 'national',
        title: 'National Sports Championship to be Held in Maharashtra',
        content: 'Maharashtra has been selected to host the upcoming National Sports Championship, bringing together athletes from across the country. The event will showcase various sports disciplines and promote athletic excellence.\n\nThe state government is making extensive preparations to ensure a successful event, with upgrades to sports facilities and accommodation arrangements for participants.',
        excerpt: 'Maharashtra to host National Sports Championship with athletes from across India.',
        tags: ['sports', 'championship', 'athletics', 'national'],
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800'
    },
    {
        category: 'sports',
        title: 'Local Cricket Team Wins District Championship',
        content: 'The Shrigonda cricket team has clinched the district championship title after a thrilling final match. The team displayed exceptional skill and teamwork throughout the tournament, defeating strong opponents.\n\nThe victory has brought pride to the local community, and the team is now preparing for the state-level competition. Local authorities have announced rewards for the winning team.',
        excerpt: 'Shrigonda cricket team wins district championship in thrilling final.',
        tags: ['cricket', 'championship', 'local sports', 'victory'],
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800'
    },
    {
        category: 'sports',
        title: 'Youth Football Academy Established in Shrigonda',
        content: 'A new football academy has been established in Shrigonda to nurture young talent and promote the sport among youth. The academy offers professional coaching, modern training facilities, and opportunities to participate in regional tournaments.\n\nThe initiative has been welcomed by parents and sports enthusiasts who see it as a platform for developing future football stars.',
        excerpt: 'New football academy opens in Shrigonda to train young athletes.',
        tags: ['football', 'youth', 'academy', 'training'],
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800'
    },
    {
        category: 'entertainment',
        title: 'Annual Cultural Festival Celebrates Local Arts',
        content: 'The annual cultural festival in Shrigonda showcased the rich artistic heritage of the region with performances in music, dance, and theater. Local artists and performers captivated audiences with traditional and contemporary presentations.\n\nThe three-day event attracted visitors from neighboring areas and provided a platform for emerging artists to showcase their talents.',
        excerpt: 'Annual cultural festival in Shrigonda celebrates local arts and traditions.',
        tags: ['culture', 'festival', 'arts', 'music', 'dance'],
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'
    },
    {
        category: 'entertainment',
        title: 'Local Theater Group Wins State Award',
        content: 'A theater group from Shrigonda has won the prestigious state-level drama competition with their powerful performance. The group\'s dedication and artistic excellence were recognized by judges and audiences alike.\n\nThe award-winning play addressed social issues and received acclaim for its compelling storytelling and performances.',
        excerpt: 'Shrigonda theater group wins state award for outstanding performance.',
        tags: ['theater', 'drama', 'award', 'performance'],
        image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800'
    },
    {
        category: 'business',
        title: 'Local Entrepreneurs Launch Innovative Startup',
        content: 'A group of young entrepreneurs from Shrigonda has launched an innovative startup focused on agricultural technology. The company aims to help farmers increase productivity through data-driven insights and modern farming techniques.\n\nThe startup has already attracted interest from investors and is planning to expand its services across the region.',
        excerpt: 'Shrigonda entrepreneurs launch agri-tech startup to help farmers.',
        tags: ['startup', 'agriculture', 'technology', 'entrepreneurship'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    },
    {
        category: 'business',
        title: 'Small Business Owners Report Growth in Local Economy',
        content: 'Small business owners in Shrigonda are reporting steady growth in the local economy, driven by increased consumer spending and government support programs. Retail shops, restaurants, and service providers have seen improved business conditions.\n\nThe local chamber of commerce attributes this growth to favorable policies and community support for local businesses.',
        excerpt: 'Small businesses in Shrigonda experience growth amid favorable economic conditions.',
        tags: ['business', 'economy', 'growth', 'retail'],
        image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800'
    }
];

async function addDemoArticles() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('shrigonda_news');
        const newsCollection = db.collection('news');

        // Clear existing articles (optional - comment out if you want to keep existing ones)
        // await newsCollection.deleteMany({});
        // console.log('Cleared existing articles');

        const articlesToInsert = demoArticles.map(article => ({
            id: uuidv4(),
            ...article,
            author: 'I Love Shrigonda News',
            authorId: 'admin',
            status: 'published',
            views: Math.floor(Math.random() * 500) + 50,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
            updatedAt: new Date().toISOString()
        }));

        const result = await newsCollection.insertMany(articlesToInsert);
        console.log(`Successfully added ${result.insertedCount} demo articles`);

        // Show count by category
        const categoryCounts = await newsCollection.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]).toArray();

        console.log('\nArticles by category:');
        categoryCounts.forEach(cat => {
            console.log(`  ${cat._id}: ${cat.count} articles`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
        console.log('\nDatabase connection closed');
    }
}

addDemoArticles();

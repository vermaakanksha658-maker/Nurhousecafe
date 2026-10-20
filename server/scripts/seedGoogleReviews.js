import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';
import Review from '../models/Review.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Real Google reviews (Nur House Cafe, 4.5 / 155) curated for the site.
// createdAt staggered: first 8 are newest -> homepage testimonial rotation.
const REVIEWS = [
  {
    name: 'Sarah A',
    rating: 5,
    menuItem: 'Salted Date Caramel Latte',
    createdAt: new Date('2026-10-15T10:00:00Z'),
    comment:
      'So happy to have this beautiful cafe in downtown. Drinks are 10/10 and the space is stunning. I tried the date cloud latte with almond milk: tasted great and the espresso and date syrup was impeccable. Fast wifi! Staff are so sweet. This will be my new remote working spot.',
  },
  {
    name: 'Inis',
    rating: 5,
    menuItem: 'Triple Berry Matcha',
    createdAt: new Date('2026-10-12T10:00:00Z'),
    comment:
      "I've been to this cafe a few times and have yet to be disappointed! Tried their triple berry matcha as well as the salted date caramel cloud latte which is an absolute WINNER for me!! Also the location is a 10/10; super walkable area.",
  },
  {
    name: 'luqman mohamed',
    rating: 5,
    menuItem: 'Butter Croissant',
    createdAt: new Date('2026-10-09T10:00:00Z'),
    comment:
      'Stopped by Nur House Cafe for their soft opening in downtown Minneapolis and loved every bit of it. I had a croissant and chai latte, simple, warm, and exactly what I needed.',
  },
  {
    name: 'leo spott',
    rating: 5,
    menuItem: 'Iced Hazelnut Cold Brew',
    createdAt: new Date('2026-10-06T10:00:00Z'),
    comment: 'Very nice space with excellent indoor and outdoor seating. My cold brew was excellent and I will be back.',
  },
  {
    name: 'Mikalia B',
    rating: 5,
    menuItem: 'Royal Masala Chai',
    createdAt: new Date('2026-10-03T10:00:00Z'),
    comment:
      "I'm so glad I stumbled upon Nur House! First of all, I love the chai!! It's the perfect spice blend and I love how you can choose your sweetener and the level of sweetness. It's so nice to have an authentic chai in this area.",
  },
  {
    name: 'Nicole Palser',
    rating: 5,
    menuItem: 'Chipotle Cheddar Egg Sandwich',
    createdAt: new Date('2026-09-30T10:00:00Z'),
    comment:
      'We were looking for a coffee shop to work from one morning, and this was a great find! The lattes were excellent, and my husband ordered an egg sandwich that he said was really good - especially for only $6.',
  },
  {
    name: 'Leila Rush',
    rating: 5,
    menuItem: 'Signature Latte',
    createdAt: new Date('2026-09-27T10:00:00Z'),
    comment:
      'The staff here is amazing and the coffee is absolutely stellar. I dropped my coffee, totally my error, and they rushed over to assist and even offered to make me another coffee. They were so incredibly kind and gracious about the situation.',
  },
  {
    name: 'Ally',
    rating: 5,
    menuItem: 'Triple Berry Cloud',
    createdAt: new Date('2026-09-24T10:00:00Z'),
    comment:
      'Ok I really liked this place! They had interesting drink options and sweetness variation! My drink was the Triple Berry Cloud Matcha and was delicious.',
  },
  {
    name: 'Jen',
    rating: 5,
    menuItem: 'Salted Date Caramel Latte',
    createdAt: new Date('2026-08-20T10:00:00Z'),
    comment:
      'I got the cloud date latte with level 2 sweetness. SO good! I hope they continue to have a latte with dates on menu. Coming back here asap.',
  },
  {
    name: 'Abby Leitch',
    rating: 5,
    menuItem: 'Salted Date Caramel Latte',
    createdAt: new Date('2026-08-15T10:00:00Z'),
    comment:
      'Nur House is my new favorite coffee shop! The salted date caramel latte is SO good! Inside is beautiful and has comfortable seating for working. 1000000/10!!',
  },
  {
    name: 'Melissa Hoang',
    rating: 5,
    menuItem: 'Salted Date Caramel Cloud',
    createdAt: new Date('2026-08-10T10:00:00Z'),
    comment:
      'What a great place. Here for work for a week, have been here every morning because they are one of the ONLY cafes opened before 7 am.',
  },
  {
    name: 'Hafsa',
    rating: 4,
    menuItem: 'Salted Date Caramel Cloud',
    createdAt: new Date('2026-08-05T10:00:00Z'),
    comment:
      'Very nice! I got the salted date caramel cloud and chocolate croissant. The coffee was not as sweet as I expected but I believe you can adjust sweetness. The pastries were delicious.',
  },
  {
    name: 'Bashiir Ibn Abdirizaq',
    rating: 5,
    menuItem: 'Triple Berry Matcha',
    createdAt: new Date('2026-07-25T10:00:00Z'),
    comment: 'Awesome matcha latte, tasty croissants, friendly and welcoming staff. Five out of five, without a doubt.',
  },
  {
    name: 'Chris Boyd',
    rating: 5,
    menuItem: 'Churro Matcha',
    createdAt: new Date('2026-07-20T10:00:00Z'),
    comment:
      'This is what I mean when I say I love a true coffee shop. The vibe here is exactly what you need when you want some good coffee, palatable conversation levels and a great work space. This Churro Latte was AMAZING!!!!!',
  },
  {
    name: 'Audree Ginsburg',
    rating: 5,
    menuItem: 'Somali Shaah',
    createdAt: new Date('2026-07-15T10:00:00Z'),
    comment:
      'Love this place, since they have opened we have tried to become regulars. We do not have many other coffee shops in the area that are open on weekends. The staff is friendly, drinks and treats are always good. Try the Somali tea!',
  },
  {
    name: 'F',
    rating: 5,
    menuItem: 'Pain Au Chocolat',
    createdAt: new Date('2026-07-10T10:00:00Z'),
    comment: "Beautiful space and location. Fresh bakery was solid, liked the pain au chocolate. You can't beat the cortado.",
  },
  {
    name: 'Brenda Sequeira',
    rating: 5,
    menuItem: 'Butter Croissant',
    createdAt: new Date('2026-07-05T10:00:00Z'),
    comment: 'The best croissants and the best coffee.',
  },
  {
    name: 'Aaron Blake',
    rating: 5,
    menuItem: 'Signature Latte',
    createdAt: new Date('2026-07-01T10:00:00Z'),
    comment:
      'They have some of the best coffee we have had in all of Minneapolis! The staff were incredibly friendly and the atmosphere was wonderful!',
  },
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  let created = 0;
  let skipped = 0;

  for (const r of REVIEWS) {
    const item = await MenuItem.findOne({ name: { $regex: `^${r.menuItem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } });
    if (!item) {
      console.log(`MENU ITEM NOT FOUND: ${r.menuItem}`);
      process.exitCode = 1;
      continue;
    }
    const exists = await Review.findOne({ name: r.name, comment: r.comment });
    if (exists) {
      skipped += 1;
      continue;
    }
    await Review.create({
      menuItem: item._id,
      name: r.name,
      rating: r.rating,
      comment: r.comment,
      status: 'approved',
      createdAt: r.createdAt,
      updatedAt: r.createdAt,
    });
    created += 1;
    console.log(`approved: ${r.name} -> ${item.name}`);
  }

  const total = await Review.countDocuments();
  const approved = await Review.countDocuments({ status: 'approved' });
  console.log(`done: created=${created} skipped=${skipped} total=${total} approved=${approved}`);
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

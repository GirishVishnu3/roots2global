/**
 * Migration Script: localStorage to MongoDB
 * 
 * This script helps migrate existing localStorage data to MongoDB database.
 * Run this after setting up your MongoDB connection.
 * 
 * Usage:
 * 1. Set up MongoDB connection in .env.local
 * 2. Run: npx ts-node scripts/migrate-to-db.ts
 */

import mongoose from 'mongoose';
import User from '../models/User';
import Order from '../models/Order';
import Product from '../models/Product';
import Review from '../models/Review';
import Coupon from '../models/Coupon';
import connectDB from '../lib/db';
import { passwordSecurity } from '../lib/security';

/****
* Brief description of the function in one line
* @example
* migrateData()
* undefined
* @param {{void}} {{Argument}} - Argument description in one line.
* @returns {{Promise<void>}} Return description in one line.
****/
async function migrateData() {
  try {
    console.log('🔄 Starting migration from localStorage to MongoDB...\n');

    // Connect to database
    await connectDB();
    console.log('✅ Connected to MongoDB\n');

    // Note: This script assumes you have localStorage data
    // In a real scenario, you would read from localStorage or a backup file
    console.log('📝 Note: This is a template migration script.');
    console.log('   You need to manually export localStorage data and import it here.\n');

    // Example: Migrate users
    console.log('👤 Migrating users...');
    // const localStorageUsers = JSON.parse(localStorage.getItem('users') || '[]');
    // for (const user of localStorageUsers) {
    //   // Check if user exists
    //   const existing = await User.findOne({ email: user.email });
    //   if (!existing) {
    //     // Migrate user
    //     // Note: You'll need to hash passwords properly
    //     console.log(`  → Migrating user: ${user.email}`);
    //   }
    // }

    // Example: Migrate products
    console.log('📦 Migrating products...');
    // const localStorageProducts = JSON.parse(localStorage.getItem('products') || '[]');
    // for (const product of localStorageProducts) {
    //   const existing = await Product.findOne({ name: product.name });
    //   if (!existing) {
    //     await Product.create(product);
    //     console.log(`  → Migrating product: ${product.name}`);
    //   }
    // }

    // Example: Migrate orders
    console.log('📋 Migrating orders...');
    // const localStorageOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    // for (const order of localStorageOrders) {
    //   // Find user by email
    //   const user = await User.findOne({ email: order.shippingAddress.email });
    //   if (user) {
    //     await Order.create({
    //       ...order,
    //       userId: user._id,
    //     });
    //     console.log(`  → Migrating order: ${order.id}`);
    //   }
    // }

    console.log('\n✅ Migration completed!');
    console.log('\n⚠️  Remember to:');
    console.log('   1. Export localStorage data');
    console.log('   2. Update this script with actual data');
    console.log('   3. Run the migration');
    console.log('   4. Verify data in MongoDB Atlas');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

// Run migration
migrateData();


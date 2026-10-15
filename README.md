# অসীমতক (Oshimtok) — GitHub Pages Ready

একটি responsive static e-commerce storefront (HTML, CSS, JavaScript) — GitHub Pages-এ প্রকাশের জন্য প্রস্তুত।

## কী কী আছে
- Responsive desktop / tablet / mobile layout
- ৬টি পণ্যের dynamic product grid, ১৫% discount ও price display
- আপলোড করা PDF থেকে নেওয়া ৬টি মডেল ছবি ও ৬টি কাপড়ের ডিটেইল ছবি (ডেস্কটপে hover করলে ডিটেইল ছবি দেখা যায়)
- Sort by price
- Shopping bag/cart: quantity update, remove, total calculation
- WhatsApp checkout with order summary
- WhatsApp quick-message form
- Coming Soon product categories
- About, contact, phone, Feni location, SEO description and footer
- No build step or server required

## GitHub Pages-এ লাইভ করার নিয়ম
1. ZIP ফাইলটি Extract করুন।
2. GitHub-এ নতুন repository তৈরি করুন, যেমন `fashion-store`।
3. `index.html`, `style.css`, `script.js` এবং `README.md` repository-র root folder-এ upload করুন।
4. Repository → **Settings** → **Pages** খুলুন।
5. **Build and deployment**-এ `Deploy from a branch` নির্বাচন করুন।
6. Branch হিসেবে `main` এবং folder হিসেবে `/ (root)` নির্বাচন করে **Save** করুন।
7. কিছুক্ষণ পর Pages URL দেখাবে। সেটি খুলে সাইট পরীক্ষা করুন।

## নিজের ব্র্যান্ড ও আসল ৬টি জামার ছবি বসানো
- `index.html`-এ ব্র্যান্ডের নাম ইতোমধ্যে `অসীমতক (Oshimtok)` সেট করা হয়েছে।
- `script.js`-এর `products` array-তে প্রতিটি পণ্যের `name`, `description`, `code`, `image` সম্পাদনা করুন।
- ছবিগুলো repository-র `assets` ফোল্ডারে রাখুন; যেমন `assets/shirt-1.jpg`। তারপর সংশ্লিষ্ট পণ্যে `image: "assets/shirt-1.jpg"` লিখুন।
- পণ্যের প্রকৃত নাম/বিবরণ/ছবি না পাওয়ায় ডেমোতে neutral placeholder ব্যবহার করা হয়েছে। লাইভ করার আগে ছয়টি placeholder image-এর বদলে আসল পণ্যের ছবি বসান।
- দাম বা ছাড় পরিবর্তন করলে `price` ও `salePrice` দুটোই আপডেট করুন।

## গুরুত্বপূর্ণ সীমাবদ্ধতা
এটি একটি **front-end storefront**, পূর্ণ backend নয়। Cart/checkout WhatsApp message তৈরি করে; অনলাইনে পেমেন্ট, অর্ডার ডাটাবেস, inventory sync, admin dashboard বা customer account নেই। এগুলো প্রয়োজন হলে আলাদা backend/payment integration লাগবে।

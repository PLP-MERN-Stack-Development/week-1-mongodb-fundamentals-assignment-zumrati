const uri = 'mongodb://localhost:27017/';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Sample book data
const books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,

    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen'& Unwin
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  }];

  //Find all books in a specific genre
  db.books.find({genre:"Fiction"})
  
//Find books published after a certain year
db.books.find({published_year:{$gt:1940}})

//Find books by a specific author
 db.books.find({author:"Political Satire"})
 
 //Update the price of a specific book
 db.books.updateOne({title:"The Hobbit"}, {$set:{price: 11.99}})

//Delete a book by its title
db.books.deleteOne({title:"1984"})

//Write a query to find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

//Use projection to return only the title, author, and price fields in your queries
db.books.find({},{title:1, author:1, price:1, _id:0})

//Implement sorting to display books by price (both ascending and descending)
db.books.find().sort({price:1})
db.books.find().sort({price:-1})

//Use the limit and skip methods to implement pagination (5 books per page)
db.books.find().skip(0).limit(5)

//Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([{$group:{_id: "$genre", average_price:{$avg:"$price"}}}])

//Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([{$group:{_id:"$author", book_count:{$sum:1}}},{$sort:{book_count:1}},{$limit:1}])

//Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [{ $toString: { $multiply: ["$_id", 10] } }, "s"] },
      count: 1
    }
  }
])


//Create an index on the title field for faster searches
db.books.createIndex({title:1})

//Create a compound index on author and published_year
db.books.createIndex({author: 1, published_year: -1})

//Use the explain() method to demonstrate the performance improvement with your indexes
db.books.find({title:"Pride and Prejudice"}).explain("executionStats")

class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
   

    search() {
        const keyword = this.queryStr.keyword
          ? {
              name: {
                $regex: this.queryStr.keyword, // regex => regular expressin use in mongoo 
                $options: "i",//=> i mean case insensative ABC also out abc 
              },
            }
          : {}; // second part of condition it return empty object
    
        this.query = this.query.find({ ...keyword });  //this.query change to this.query.find that import
        return this;
      }
    

      // filter for categry to check it categry like vivo or iphon etc
      filter() {
        const queryCopy = { ...this.queryStr };  // queryStr is object used for extra string entering in api like name, price etc we copy i.e [keyword,page,category etc] to  using spread operator
       
        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
       
    
      // Filter For Price and Rating
      // console.log(queryCopy)
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); // replace on dollar sign becouse mongo support variabl with dollar sign
  
      this.query = this.query.find(JSON.parse(queryStr));
      // console.log(queryStr)
  
      return this;
      }

      // how many item/product per page want to display after searching
      pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
    
        const skip = resultPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
      }

}


module.exports = ApiFeatures;
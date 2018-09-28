async function compileReviews(reviews) {

    let compiledReviews = [];

    for( let i = 0, len = reviews.length; i < len; i++) {
        let {
            "Last Updated Date": lastUpdatedDate,
            "ID": id,
            "Store ID": storeId,
            "Name": name,
            "Address": address,
            "City": city,
            "State": state,
            "ZIP": zip,
            "Site": site,
            "Author Name": authorName,
            "Review": Review,
            "Review Date": reviewDate,
            "Rating": rating,
            "URL": url,
            "Response": response,
            "Response Date": responseDate,
            "Response User": responseUser
        } = reviews[i];

        rating = Number(rating);

        let locationIndex = compiledReviews.findIndex(obj => obj.storeId === storeId);

        if(locationIndex >= 0) {
            let location = compiledReviews[locationIndex]
            location.rating += rating;
            location.totalReviews ++;
            location.reviews.push({
                lastUpdatedDate,
                id,
                site,
                authorName,
                review: Review,
                reviewDate,
                rating,
                response,
                responseDate,
                responseUser
            });
        }else {
            compiledReviews.push({
                storeId,
                name,
                address,
                city,
                state,
                zip,
                url,
                reviews: [],
                totalReviews: 0,
                rating: 0
            });
        }
    }

    compiledReviews.forEach(store => {
        return store.rating = Number((store.rating / store.totalReviews).toFixed(2));
    });

    return compiledReviews;

}

module.exports = compileReviews;
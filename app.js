const express = require('express'); 
const morgan = require('morgan'); 

const app = express(); 

app.use(morgan('common')); 

const apps = require('./playStoreApps.js')

console.log( ['Bananas', 'Apples'].sort((a, b) => a.localeCompare(b, 'en', {sensitivity: 'base'})) )

// ['Apple', 'Orange', 'Banana'].sort()

// function sortData(sort, a, b) {

// }

app.get('/apps', (req, res) => {
    const { sort, genre } = req.query; 
    // console.log(Array.isArray(sort));

    // if (Array.isArray(sort)){
    //     sort = sort.toString(); 
    // }

    if(sort) {
        if(!['rating', 'app'].includes(sort)){
            return res
                .status(400)
                .send('Must sort by rating or app'); 
        }
        else if (['rating'].includes(sort)) {
            appsSorted = apps
                .sort((a, b) => (a.Rating - b.Rating));
            return res.json(appsSorted); 
        }
        else if (['app'].includes(sort)) {
            appsSorted = apps
                .sort(
                    (a, b) => (
                        a.App.localeCompare(b.App, 'en', {sensitivity: 'base'})
                    )
                ); 
            return res.json(appsSorted); 
        }
        // else {
        //     appsSorted = apps
        //         .sort((a, b) => (
        //             if (['rating'].includes(sort)) {
                        
        //             }
        //         )
        // }
    
    }


    if(genre) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)){
            return res
                .status(400)
                .send('Must filter by genre'); 
        }

        else {
            genresFiltered = apps
                .filter(app => app.Genres.includes(genre)); 
            return res.json(genresFiltered); 
        }
    }
    res
        .json(apps);
}); 

app.listen(8000, () => {
    console.log('Server started on PORT 8000')
})
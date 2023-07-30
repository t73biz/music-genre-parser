const { spawn } = require('child_process');
const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Get the html for a given url
 * @param {String} url
 * @returns {Promise<any>}
 */
const getHTML = async (url) => {
    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

/**
 * Parse the title
 * @param {String} html
 * @returns {String}
 */
function parseGenre(html) {
    const $ = cheerio.load(html);

    // Parse the following tree structure
    /**
     * <tr>
     *     <th scope="row" class="infobox-label">
     *         <a href="/wiki/Music_genre" title="Music genre">Genre</a>
     *     </th>
     *     <td class="infobox-data category hlist">
     *         <ul>
     *             <li>
     *                 <a href="/wiki/Rock_music" title="Rock music">Rock</a>
     *             </li>
     *             <li>
     *                 <a href="/wiki/Disco" title="Disco">disco</a>
     *             </li>
     *         </ul>
     *     </td>
     * </tr>
     */
    let genres = $('a[title="Music genre"]')
        .first()
        .parent()
        .siblings('td')
        .first()
        .children('ul')
        .children('li')
        .children('a');

    let genresArray = genres.map(function() {
        return $(this).text();
    }).get();

    // Join the array elements with commas to get the comma-delimited string
    return genresArray.join(', ');
}


// Main function to use the above helper functions
async function main() {
    const url = 'https://en.wikipedia.org/wiki/Another_Brick_in_the_Wall'; // Replace this with the desired website URL

    try {
        const htmlContent = await getHTML(url);
        const titleAttribute = parseGenre(htmlContent);

        console.log('Title attribute:', titleAttribute);
    } catch (error) {
        console.error(error.message);
    }
}

main();

# gamereviews

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

README



GET /games hakee kaikki tietokannan pelit URL:in kategoria parametrilla järjestettynä(parametri asettuu kategoria nappia painamalla).
JSON: Sisältää kaikki pelit ja jokaisesta pelistä löytyy name, platforms, image ja kategoria.

POST /addreview Lisää tietokantaan uuden arvostelun.
GET, /gameDetails Hakee tietokannasta yhden pelin tiedot.
JSON: Sisältää yhden pelin jossa on sisällä kaikki kyseisen pelin tiedot tietokannasta

GET /gamereviews Hakee tietokannasta kaikki kyseisen pelin arvostelut. 
JSON: Sisältää kaikki gamedetails sivulla haetun pelin arvostelut, joista jokainen sisältää eri kategorioiden pisteet, arvioijan username:n, arvion otsikon ja arvio tekstin.

POST /register, Validoi ja rekisteröi käyttäjän, jos validia dataa.


GET /login, Antaa käyttäjälle keksin
JSON Sisältää tiedon onko käyttäjällä keksi joka ei ole vanhentunut.


POST /login, Kirjaa käyttäjän sisään jos sähköposti oikein ja salasanan hash vastaa 
tietokannassa olevaa hashia.
JSON: Sisältää tiedon sisäänkirjautumisen onnistumisesta, käyttäjän id:stä ja käyttäjätunnuksesta.

POST /search, Etsii tietokannasta kaikki pelit, jotka vastaavat annettua merkkijonoa.
JSON: Sisältää kaikkien löydettyjen pelien tiedot.

DELETE /logout, Kirjaa käyttäjän ulos tuhoamalla session.

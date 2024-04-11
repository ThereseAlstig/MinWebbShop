MINWEBBSHOP -huvudmapp
CLIENT- fronendprojekt 
Undermappar:




MinButik
vite-project



npm create vite npm cd webbShopSida npm run dev - resulterade i fle mappar än tänkt

Att installera:
1. npm install axios, react-router-dom, sass

I mapp -crs-pages
Hittar vi sidor för

Huvudsidan - med kundkorg samt produkter
Samt Sida för beställning/kundkorg

Man kan registrera sig, logga in, lägga i kundkorg, ändra antal produkter. Sen skriver man i sitt postnummer, får förslag på levernasställe, cokar i och kan sen gå vidare till genomförköp. Då slussas man vidare till beställningssdian där man kan föra in en kod MC24 och få 10000kr rabatt. Rekomenderar starkt att ta rabatten. 

sen kommer man om vidare till confirm order där man antingen får en bekräftelse på genomfört köp om allt gick bra. Man kan därifrån gå till antingen förstasidan eller beställningar sidan. 


Backend
server inloggning

Skapa en servermapp npm initi --y

2. npm install npm install express, cors, cookie-session, npm init bcrypt
npm install stripe, dotenv, nodemon (om man inte har globalt)

Mappar:
data- med filer med data -användare med lösenord - ordrar
middleware - För att se om man är inloggad
utils - mapp för att lägga functioner -hämta användare
resorces med två under mappar
auth- auth.controllers Funktioner för att registrera, logga in och logga ut användare. auth.router är routern för dessa
users -users.controllers för att hämta användare
stripe.controllers - alla functioner kopplade till stripe
stripe.router - alla touters kopplade till dessa functioner





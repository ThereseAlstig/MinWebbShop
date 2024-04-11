MINWEBBSHOP -huvudmapp
CLIENT- fronendprojekt 

(KÖR - npm i i client mappen)

För att köra igång kör 
client-mappennpm create vite 
servermappen 
npm init --y
npm run express


Att installera i client mappen:
1. npm install axios, react-router-dom, sass(bytte css mot sass)

I mapp -crs-pages
Hittar vi sidor för

Huvudsidan - med kundkorg samt produkter
Samt Sida för beställning/kundkorg

Man kan registrera sig, logga in, lägga i kundkorg, ändra antal produkter. Sen skriver man i sitt postnummer, får förslag på levernasställe, cokar i och kan sen gå vidare till genomförköp. Då slussas man vidare till beställningssdian där man kan föra in en kod MC24 och få 10000kr rabatt. Rekomenderar starkt att ta rabatten. 

sen kommer man om vidare till confirm order där man antingen får en bekräftelse på genomfört köp om allt gick bra. Man kan därifrån gå till antingen förstasidan eller beställningar sidan. 


Backend
server inloggning



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




Uppgift-
Har samtliga delar som behövs för VG delen, hämtar api från postnord, man behöver klicka i tutan för att kunna betala och på metalsudan kan man lägga in MC24 och få 10000kr rabatt. 
Man kan som inloggad hämta och se sina beställningar och man kan inte spara order förrän det är verifierat att ordern är betad. 


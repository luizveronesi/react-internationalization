1- Crea una cartella nell'area di accesso a Internet con il nome "interviews".
2- Apri il file .htaccess.

Cambia la linea:
AuthUserFile %FULL_PATH%/interviews/.htpasswd

Modifica il valore di %FULL_PATH% con il percorso completo della cartella. Per esempio: /data/httpd/upload
Ricorda di iniziare il percorso con /.

3- Il file .htpasswd contiene le informazioni di accesso con username e password (criptate).

È già presente un utente:

username: admin
password: Vu1QdHt9hMrKLvidAPn1

Per creare nuovi utenti, accedi a: https://www.web2generators.com/apache-tools/htpasswd-generator
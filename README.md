
# ON SERVER REBOOT
- check container is deployed
- `systemctl restart nginx`


# CNU 27 INFORMATIQUE - Guide dossier qualification

https://cnu27.ls2n.fr/note-pour-les-candidatures-a-la-qualification/

- attestation enseignement
- tout en francais
- add materials of each course (syllabus, exam, project, etc)

- améliore les colonnes des cours

# print cv

- activate "pritnable: true" in _quarto.yml
- open mozilla firefox
 - open devtools (F12)
 - select fourth icon (print preview)
 - right click on the page -> print preview
 - select "print to pdf"


# export sans en-tête ni pied de page avec firefox


Dans la barre d’adresse, tape about:config → accepte le risque.

Dans la recherche, tape print.print_header pour voir les clés.

Modifie (double-clique) et vide les valeurs suivantes (mets-les à chaîne vide "") :

print.print_headerleft

print.print_headermiddle

print.print_headerright

print.print_footerleft

print.print_footermiddle

print.print_footerright

Remarque : il existe aussi des clés spécifiques au nom de l’imprimante, par ex. print.printer_<NOM_IMPRIMANTE>.print_headerleft. Si tu veux modifier les réglages pour une imprimante précise, cherche print.printer_ et édite les clés correspondantes
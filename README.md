run printable.qmd to "print" with firefox but you need to modify some variables of firefox

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
# duplicate index.qmd to printable.qmd
cp index.qmd printable_en.qmd
# modify printable_en.qmd to change "printable: false" to "printable: true"
sed -i 's/printable: false/printable: true/' printable_en.qmd

# duplicate index.qmd to printable.qmd
cp printable_en.qmd printable_fr.qmd
# modify printable_fr.qmd to change "lang: en" to "lang: fr"
sed -i 's/lang: en/lang: fr/' printable_fr.qmd

# modify printable_fr.qmd to change "en: true" to "fr: true"
sed -i 's/en: true/fr: true/' printable_fr.qmd



quarto preview --no-browser
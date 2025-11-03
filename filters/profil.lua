local Profil = {}

function Profil.render(metadata, debug)
    local printable = metadata.printable or false
    local profil = metadata.profil or {}
    if debug then
        quarto.log.output(profil) 
    end
    local thumbnail = pandoc.utils.stringify(profil.thumbnail)
    local informations = profil.informations
    local socials = profil.socials

    local thumbnail_html = string.format([[
        <img src="%s" class="img-thumbnail" alt="Profil picture" style="border:none;">
    ]], thumbnail);

    local info_html = ""
    for _, info in ipairs(informations) do
    local name = pandoc.utils.stringify(info.name or "")
    local icon = pandoc.utils.stringify(info.icon or "")
    local text = pandoc.utils.stringify(info.text or "")
    info_html = info_html .. string.format([[
        <div class="d-inline-flex align-items-start">
            <span class="text-start"><i class="bi bi-%s"></i> <b>%s:</b> %s</span>
        </div>
    ]], icon, name, text)
    end
    local html = ""
    local social_html = ""
    if printable then
        for _, social in ipairs(socials) do
        local name = pandoc.utils.stringify(social.name or "")
        local icon = pandoc.utils.stringify(social.icon or "")
        local href = pandoc.utils.stringify(social.href or "")
        local btn = pandoc.utils.stringify(social.btn or "")
        social_html = social_html .. string.format([[
            <div class="d-inline-flex align-items-start">
                <span class="text-start"><i class="bi bi-%s"></i> <b>%s:</b> <a href="%s">%s</a></span>
            </div>
        ]], icon, name, href, href)
        end
        html = string.format([[
        <div>  
            <!--<p class="subtitle lead">Assistant Professor in Computer Science<br>Univ. Bordeaux, ESTIA-Institute of Technology, EstiaR, № 201420655V</p>-->
            <div class="text-center profil">
                <div class="grid" style="--bs-gap: 0rem 1rem;">
                    <div class="g-col-3">
                        %s
                    </div>
                    <div class="g-col-9 d-flex align-items-center">
                        <div class="grid" style="--bs-columns: 1; --bs-gap: 0.2em 0rem;">
                        %s
                        %s
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ]], thumbnail_html, info_html, social_html)

    else
        for _, social in ipairs(socials) do
        local name = pandoc.utils.stringify(social.name or "")
        local icon = pandoc.utils.stringify(social.icon or "")
        local href = pandoc.utils.stringify(social.href or "")
        local btn = pandoc.utils.stringify(social.btn or "")
        social_html = social_html .. string.format([[
            <a class="btn %s" href="%s">
                <i class="bi bi-%s"></i> %s
            </a>
        ]], btn, href, icon, name)
        end
        social_html = string.format([[<div class="d-inline-flex align-items-center gap-2">%s</div>]], social_html)
        html = string.format([[
        <div>  
            <!--<p class="subtitle lead">Assistant Professor in Computer Science<br>Univ. Bordeaux, ESTIA-Institute of Technology, EstiaR, № 201420655V</p>-->
            <div class="container text-center profil">
                <div class="grid" style="--bs-gap: 0rem 1rem;">
                    <div class="g-col-12 g-col-sm-12 g-col-md-3 g-col-lg-3">
                        %s
                    </div>
                    <div class="g-col-12 g-col-sm-12 g-col-md-9 g-col-lg-9 d-flex align-items-center">
                        <div class="grid" style="--bs-columns: 1; --bs-gap: 0.2em 0rem;">
                        %s
                        %s
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ]], thumbnail_html, info_html, social_html)
    end


    return html
end

return Profil
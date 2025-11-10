local Profil = {}

function Profil.render(metadata, debug)
    local printable = metadata.printable or false
    local lang = pandoc.utils.stringify(metadata.lang) or "en"
    quarto.log.output("===== LANGUAGE =====")
    quarto.log.output(lang)

    local profil = metadata.profil or {}
    if debug then
        quarto.log.output(profil) 
    end
    local thumbnail = pandoc.utils.stringify(profil.thumbnail)
    local info_title_html = pandoc.utils.stringify(profil.informations.title[lang] or "")
    local social_title_html = pandoc.utils.stringify(profil.socials.title[lang] or "")
    local informations = profil.informations.items or {}
    local socials = profil.socials.links or {}

    local thumbnail_html = string.format([[
        <img src="%s" class="img-thumbnail" alt="Profil picture" style="border:none;">
    ]], thumbnail);

    
    local keywords = profil.keywords.en or {}
    if lang ~= "en" and profil.keywords[lang] then
        keywords = profil.keywords[lang]
    end

    local keywords_html = ""
    for _, keyword in ipairs(keywords) do
        local kw = pandoc.utils.stringify(keyword or "")
        keywords_html = keywords_html .. string.format([[
            <span class="badge bg-light" style="margin-right:0.25rem; font-size: 1rem;">%s</span>
        ]], kw)
    end
    
    keywords_html = string.format([[
        <div class="d-inline-flex align-items-start flex-wrap">
            %s
        </div>
    ]], keywords_html)

    local info_html = ""
    for _, info in ipairs(informations) do
    local name = pandoc.utils.stringify(info.name[lang] or "")
    local icon = pandoc.utils.stringify(info.icon or "")
    local text = pandoc.utils.stringify(info.text[lang] or "")
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
        local name = pandoc.utils.stringify(social.name[lang] or "")
        local icon = pandoc.utils.stringify(social.icon or "")
        local href = pandoc.utils.stringify(social.href or "")
        social_html = social_html .. string.format([[
            <div class="d-inline-flex align-items-start">
                <span class="text-start"><i class="bi bi-%s"></i> <b>%s:</b> <a href="%s">%s</a></span> 
            </div>
        ]], icon, name, href, href)
        end
        html = string.format([[
        <div>  
            <div class="text-center profil">
                <div class="grid" style="--bs-gap: 0rem 1rem;">
                    <div class="g-col-2">
                        %s
                    </div>
                    <div class="g-col-5 d-flex align-items-center">
                        <div class="grid" style="--bs-columns: 1; --bs-gap: 0.2em 0rem;">
                        <h3 class="text-start">%s</h3>
                        %s
                        </div>
                    </div>
                    <div class="g-col-5 d-flex align-items-center">
                        <div class="grid" style="--bs-columns: 1; --bs-gap: 0.2em 0rem;">
                        <h3 class="text-start">%s</h3>
                        %s
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ]], thumbnail_html, info_title_html, info_html, social_title_html, social_html)

    else
        for _, social in ipairs(socials) do
        local name = pandoc.utils.stringify(social.name[lang] or "")
        local icon = pandoc.utils.stringify(social.icon or "")
        local href = pandoc.utils.stringify(social.href or "")
        local color = pandoc.utils.stringify(social.color or "")
        social_html = social_html .. string.format([[
            <a class="btn btn-outline-custom" style="--bs-btn-color:%s;--bs-btn-hover-border-color:%s;" href="%s">
                <i class="bi bi-%s"></i> %s
            </a>
        ]], color, color, href, icon, name)
        end
        social_html = string.format([[<div class="d-inline-flex align-items-center gap-2">%s</div>]], social_html)
        html = string.format([[
        <div>
            <div class="container text-center profil">
                <div class="grid" style="--bs-gap: 0rem 1rem;">
                    <div class="g-col-12 g-col-sm-12 g-col-md-3 g-col-lg-3">
                        %s
                    </div>
                    <div class="g-col-12 g-col-sm-12 g-col-md-9 g-col-lg-9 d-flex align-items-center">
                        <div class="grid" style="--bs-columns: 1; --bs-gap: 0.2em 0rem;">
                        %s
                        %s
                        %s
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ]], thumbnail_html, keywords_html, info_html, social_html)
    end


    return html
end

return Profil
local Educations = {}

function Educations.render(metadata, debug)
    local printable = metadata.printable  or false
    local educations = metadata.educations or {}
    local educations_html = ""
      for i, education in ipairs(educations) do
        if debug then
            quarto.log.output(educations) 
        end
        local thumbnail = pandoc.utils.stringify(education.thumbnail or "")
        local degree = pandoc.utils.stringify(education.degree or "")
        local period = pandoc.utils.stringify(education.period or "")
        local url = pandoc.utils.stringify(education.url or "")
        local institution = pandoc.utils.stringify(education.institution or "")
        local location = pandoc.utils.stringify(education.location or "")

        local img_html = thumbnail ~= "" and string.format('<img src="%s" class="image-hover-effect" style="max-height: 100px; max-width: 100%%; object-fit: contain;">', thumbnail) or ""
        
        local more = education.more or {}
        local display_more_button = ""
        local display_more_div = ""

        if next(more) then
            local id = "education_"..i
            display_more_button = string.format([[
                <div style="margin-left:0.5rem;">
                    <a class="btn btn-outline-dark btn-sm btn-collapse" id="%s" role="button">
                        <i class="bi bi-caret-right-fill"></i><span> More</span>
                    </a>
                </div>]], id)
            local name = pandoc.utils.stringify(more.name or "")
            local title = pandoc.utils.stringify(more.title or "")
            local abstract = pandoc.utils.stringify(more.abstract or "")
            local members = more.jury or {}
            local members_html = ""
            for j, member in ipairs(members) do
                local name = pandoc.utils.stringify(member.name or "")
                local role = pandoc.utils.stringify(member.role or "")
                local position = pandoc.utils.stringify(member.position or "")
                members_html = members_html .. string.format([[
                <tr>
                <td>%s</td>
                <td>%s</td>
                <td>%s</td>
                </tr>]], name, role, position)
            end

            local jury_html = string.format([[
                <table class="table table-borderless">
                    <thead>
                        <tr>
                        <th scope="col">PhD Defense Committee member</th>
                        <th scope="col">Role</th>
                        <th scope="col">Position</th>
                        </tr>
                    </thead>
                    <tbody>
                    %s
                    </tbody>
                </table>
                ]], members_html)
            
            local laboratory = pandoc.utils.stringify(more.laboratory or "")
            local pdf = pandoc.utils.stringify(more.pdf or "")
            local md_ref = pandoc.write(pandoc.Pandoc({pandoc.Para(more.ref)}), "markdown")
            local parsed_ref = pandoc.read(md_ref, "markdown")
            local ref = pandoc.write(parsed_ref, "html")
            ref = ref:gsub("^<p>", ""):gsub("</p>%s*$", "")

            display_more_div = string.format([[
                    <div class="collapse" id="%s">
                        <div class="d-flex flex-column align-items-left">
                            <h3 style="margin-bottom:0">%s</h3>
                            <p class="subtitle lead">%s</p>
                            <div class="d-inline-flex align-items-center gap-2" style="margin-bottom:1rem;">
                                <a class="btn btn-sm btn-outline-dark" href="%s" target="_blank">
                                    <i class="bi bi-box-arrow-up-right"></i> Open
                                </a>
                                <a class="btn btn-sm btn-outline-dark" href="%s" download>
                                    <i class="bi bi-download"></i> Download
                                </a>
                            </div>
                            <div style="font-size: 1em;margin-bottom:1rem;"><b>Abstract</b><br>%s</div>
                            <div style="font-size: 1em;margin-bottom:1rem;"><b>Laboratory</b><br>%s</div>
                            <div style="font-size: 1em;margin-bottom:1rem;">%s</div>
                            <div style="display: flex; flex-direction: column; line-height: 1.2;">
                                <div style="margin-bottom:0.5rem">
                                    <div style="font-size: 1em;"><b>Citation</b><br>%s</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ]], id, title, name, pdf, pdf, abstract, laboratory, jury_html,  ref)
            
        end

        if printable then
            local institution_html = ""
            if institution ~= "" then
                institution_html = string.format('<a href="%s" target="_blank">%s <i class="bi bi-box-arrow-up-right" style="font-size:0.8em;"></i></a>,', url, institution)
            end
            educations_html = educations_html .. string.format([[
                <tr>
                <td style="text-align: right;">%s</td>
                <td>
                <b>%s</b>
                <br>
                %s %s
                </td>
                </tr>
            ]], period, degree, institution_html, location)
        else
            educations_html = educations_html .. string.format([[
                <div class="g-col-12">
                    <div class="grid">
                        <div class="g-col-2 d-flex align-items-center justify-content-center">
                            %s
                        </div>
                        <div class="g-col-10 d-flex align-items-center">
                            <div class="d-flex flex-row align-items-center">
                                <div style="display: flex; flex-direction: column; line-height: 1.2;">
                                    <div style="font-size: 1em;">%s</div>
                                    <div style="font-size: 0.8em; color: rgba(0,0,0,.4);">%s</div>
                                </div>
                                %s
                            </div>
                            %s
                        </div>
                    </div>
                </div>
            ]], img_html, degree, period, display_more_button, display_more_div)
        end

    end

    if printable then
        educations_html = string.format([[
            <table class="table table-borderless">
                <tbody>
                    %s
                </tbody>
            </table>
        ]], educations_html)
    end

    local html = string.format([[
    <div class="grid gap-2">
        %s
    </div>
    ]], educations_html)

    return html
end

return Educations
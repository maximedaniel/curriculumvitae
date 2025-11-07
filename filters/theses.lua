local Theses = {}

function Theses.render(metadata, debug)
    local printable = metadata.printable or false
    local theses = metadata.theses or {}
    local theses_html = ""
      for i, thesis in ipairs(theses) do
        if debug then
            quarto.log.output(theses) 
        end

        local thumbnail = pandoc.utils.stringify(thesis.thumbnail or "")
        local pdf = pandoc.utils.stringify(thesis.pdf or "")
        local md_ref = pandoc.write(pandoc.Pandoc({pandoc.Para(thesis.ref)}), "markdown")
        local parsed_ref = pandoc.read(md_ref, "markdown")
        local ref = pandoc.write(parsed_ref, "html")
        ref = ref:gsub("^<p>", ""):gsub("</p>%s*$", "")

        local name = pandoc.utils.stringify(thesis.name or "")
        local title = pandoc.utils.stringify(thesis.title or "")
        local abstract = pandoc.utils.stringify(thesis.abstract or "")
        local members = thesis.jury or {}
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
            <table class="table table-borderless table-sm">
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
        
        local laboratory = pandoc.utils.stringify(thesis.laboratory or "")
        if printable then
            theses_html = theses_html .. string.format([[
                <div class="g-col-12">
                    <div class="grid">
                        <div class="g-col-2 d-flex align-self-start">
                            <img src="%s" style="max-height: 100px; max-width: 100%%;object-fit: contain;"">
                        </div>
                        <div class="g-col-10 d-flex align-items-center gap-2">
                            <div style="display: flex; flex-direction: column; line-height: 1.2;">
                                <div style="margin-bottom:0.5rem">
                                    <span>%s</span>
                                </div>
                                <div class="d-flex flex-column align-items-left">
                                    <h3 style="margin-bottom:0">%s</h3>
                                    <p class="subtitle lead">%s</p>
                                    <div style="font-size: 1em;margin-bottom:1rem;"><b>Abstract</b><br>%s</div>
                                    <div style="font-size: 1em;margin-bottom:1rem;"><b>Laboratory</b><br>%s</div>
                                    <div style="font-size: 1em;margin-bottom:1rem;">%s</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ]], thumbnail, ref, title, name, abstract, laboratory, jury_html)
        else
            local thesis_id = "thesis_"..i
            theses_html = theses_html .. string.format([[
                <div class="g-col-12">
                    <div class="grid">
                        <div class="g-col-2 d-flex align-self-start">
                            <img src="%s" style="max-height: 100px; max-width: 100%%;object-fit: contain;"">
                        </div>
                        <div class="g-col-10 d-flex align-items-center gap-2">
                            <div style="display: flex; flex-direction: column; line-height: 1.2;">
                                <div style="margin-bottom:0.5rem">
                                    <span>%s</span>
                                </div>
                                <div class="d-inline-flex align-items-center gap-2">
                                    <a class="btn btn-sm btn-outline-dark" href="%s" target="_blank">
                                        <i class="bi bi-box-arrow-up-right"></i> PDF
                                    </a>
                                    <a class="btn btn-outline-dark btn-sm btn-collapse" id="%s" role="button">
                                        <i class="bi bi-caret-right-fill"></i><span> More</span>
                                    </a>
                                </div>
                                <div class="collapse" id="%s">
                                    <div class="d-flex flex-column align-items-left">
                                        <h3 style="margin-bottom:0">%s</h3>
                                        <p class="subtitle lead">%s</p>
                                        <div style="font-size: 1em;margin-bottom:1rem;"><b>Abstract</b><br>%s</div>
                                        <div style="font-size: 1em;margin-bottom:1rem;"><b>Laboratory</b><br>%s</div>
                                        <div style="font-size: 1em;margin-bottom:1rem;">%s</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ]], thumbnail, ref, pdf, thesis_id, thesis_id, title, name, abstract, laboratory, jury_html)
        end
    end

    local html = string.format([[
    <div class="grid">
        %s
    </div>
    ]], theses_html)

    return html
end

return Theses
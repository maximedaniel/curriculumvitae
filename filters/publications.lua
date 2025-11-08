local Publications = {}

function ref_to_markdown(ref)
  if not ref then
    return ""
  end

  if type(ref) == "string" then
    -- Already Markdown
    return ref

  elseif type(ref) == "table" then
    -- Could be a list of inlines or a single element
    if ref.t then
      -- Single element
      return pandoc.write(pandoc.Pandoc({pandoc.Para({ref})}), "markdown")
    else
      -- List of inlines
      return pandoc.write(pandoc.Pandoc({pandoc.Para(ref)}), "markdown")
    end
  end

  return ""
end

function Publications.render(metadata, debug)
    local printable = metadata.printable or false
    local html = ""
    local categories = metadata.publications or {}
    for _, category in ipairs(categories) do
        local category_name = pandoc.utils.stringify(category.category or "")
        if debug then
            quarto.log.output(category_name) 
        end
        local publications = category.inputs or {}
        local publications_html = ""
        for _, publication in ipairs(publications) do
            local thumbnail = pandoc.utils.stringify(publication.thumbnail or "")

            local pdf = pandoc.utils.stringify(publication.pdf or "")
            local pdf_html = ""
            if pdf ~= "" then
                if printable then
                    pdf_html = string.format([[
                    <a href="%s" target="_blank">pdf <i class="bi bi-box-arrow-up-right" style="font-size:0.8em;"></i></a>]], pdf)
                
                else
                    pdf_html = string.format([[
                    <a class="btn btn-sm btn-outline-dark" href="%s" target="_blank">
                        <i class="bi bi-box-arrow-up-right"></i> PDF
                    </a>]], pdf)
                end
            end

            local doi = pandoc.utils.stringify(publication.doi or "")
            local doi_html = ""
            if doi ~= "" then
                if printable then
                    -- doi_html = string.format([[
                    -- <a href="%s" target="_blank">doi <i class="bi bi-box-arrow-up-right" style="font-size:0.8em;"></i></a>]], doi)
                    doi_html = string.format([[<a href="%s" target="_blank">%s</a>]], doi, doi)
                
                else
                    doi_html = string.format([[
                    <a class="btn btn-sm btn-outline-dark" href="%s" target="_blank">
                        <i class="bi bi-box-arrow-up-right"></i> DOI
                    </a>]], doi)
                end
            end
            
            local note = pandoc.utils.stringify(publication.note or "")
            local note_html = ""
            if note ~= "" then
                note_html = string.format([[<p style="margin-bottom:0.25rem;font-size:0.8em;opacity:0.75">%s</p>]], note)
            end

            local md_ref = pandoc.write(pandoc.Pandoc({pandoc.Para(publication.ref)}), "markdown")
            local parsed_ref = pandoc.read(md_ref, "markdown")
            local ref = pandoc.write(parsed_ref, "html")
            ref = ref:gsub("^<p>", ""):gsub("</p>%s*$", "")
            local submissions = publication.submissions or {}
            local submissions_html = ""
            for i, submission in ipairs(submissions) do
                local name = pandoc.utils.stringify(submission.name or "")
                local track = pandoc.utils.stringify(submission.track or "")
                if i == #submissions - 1 then
                    submissions_html = submissions_html .. string.format([[
                        <li class="breadcrumb-item active"><i class="bi bi-x" style="vertical-align: middle;-webkit-text-stroke: 1px;"></i>%s (%s)</li>
                    ]], name, track)
                else
                    submissions_html = submissions_html .. string.format([[
                        <li class="breadcrumb-item"><i class="bi bi-check" style="vertical-align: middle;-webkit-text-stroke: 1px;"></i>%s (%s)</li>
                    ]], name, track)
                end
            end
            local final_submissions_html = string.format([[
                <ol class="breadcrumb" style="margin-bottom:0.25rem;">
                    %s
                </ol>
                ]], submissions_html)

            local keywords = publication.keywords or {}
            local keywords_html = ""
            if #keywords > 0 then
                for _, keyword in ipairs(keywords) do
                    local kw = pandoc.utils.stringify(keyword or "")
                    keywords_html = keywords_html .. string.format([[
                        <span class="badge bg-light" style="margin-right:0.25rem; margin-bottom:0.25rem;">%s</span>
                    ]], kw)
                end
                keywords_html = string.format([[
                    <div class="d-inline-flex align-items-start flex-wrap">
                        %s
                    </div>
                    ]], keywords_html)
            end
            -- parse that markdown to a Pandoc document (so pandoc does actual markdown -> html)
            -- local parsed = pandoc.read(md, "markdown")
            -- local html = pandoc.write(parsed, "html")
            if printable then
                publications_html = publications_html .. string.format([[
                    <div class="g-col-1">
                    </div>
                    <div class="g-col-11">
                        <div class="grid">
                        <div class="g-col-12 d-flex align-items-center gap-2">
                            <div style="display: flex; flex-direction: column; line-height: 1.2;">
                                <div>
                                    %s
                                    <p style="margin-bottom:0.25rem;">%s %s</p>
                                    %s
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                ]], keywords_html, ref, doi_html, note_html)
            else
                publications_html = publications_html .. string.format([[
                    <div class="g-col-12">
                        <div class="grid">
                        <div class="g-col-2 d-flex align-items-center justify-content-center">
                            <img src="%s" style="max-height: 100px; max-width: 100%%;object-fit: contain;"">
                        </div>
                        <div class="g-col-10 d-flex align-items-center gap-2">
                            <div style="display: flex; flex-direction: column; line-height: 1.2;">
                                <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%%3E%%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%%3E%%3C/svg%%3E&#34;);" aria-label="breadcrumb" >
                                %s
                                </nav>
                                <div>
                                    %s
                                    <p style="margin-bottom:0.25rem;">%s</p>
                                    %s
                                </div>
                                <div class="d-inline-flex align-items-center gap-2">
                                    %s
                                    %s
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                ]], thumbnail, final_submissions_html, keywords_html, ref,  note_html, pdf_html, doi_html)
            end

        end
        
        html = html .. string.format([[
        <h3>%s</h3>
        <div class="grid gap-4">
            %s
        </div>
        ]], category_name, publications_html)
    end

    return html
end

return Publications
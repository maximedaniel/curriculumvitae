local Reviews = {}

function Reviews.render(metadata, debug)
    local printable = metadata.printable or false
    local reviews = metadata.reviews or {}
    local reviews_html = ""
    local recognitions_html = ""
      for _, review in ipairs(reviews) do
        if debug then
            quarto.log.output(review) 
        end
        local name = pandoc.utils.stringify(review.name or "")
        local assigned = pandoc.utils.stringify(review.assigned or "")
        
        reviews_html = reviews_html .. string.format([[
            <tr>
                <td>%s</td>
                <td>%s</td>
            </tr>
            ]], name, assigned)

        local recognized = pandoc.utils.stringify(review.recognized or "")
        if recognized ~= "" then
            recognitions_html = recognitions_html .. string.format([[
                <div>%s recognition for %s</div>
                ]], recognized, name)
        end
    end
    local html = ""
    if printable then
        html = string.format([[
            <div class="grid">
                <div class="g-col-6">
                    <table class="table table-sm table-borderless">
                        <thead>
                            <tr>
                            <th scope="col">Category</th>
                            <th scope="col">Assigned</th>
                            </tr>
                        </thead>
                        <tbody>
                        %s
                        </tbody>
                    </table>
                </div>
                <div class="g-col-6">
                    <h3>Special Recognitions for Outstanding Reviews</h3>
                    %s
                </div>
            </div>
            ]], reviews_html, recognitions_html)
    else
        html = string.format([[
            <div class="grid">
                <div class="g-col-sm-12 g-col-md-6 g-col-lg-6">
                    <table class="table table-sm table-borderless">
                        <thead>
                            <tr>
                            <th scope="col">Category</th>
                            <th scope="col">Assigned</th>
                            </tr>
                        </thead>
                        <tbody>
                        %s
                        </tbody>
                    </table>
                </div>
                <div class="g-col-sm-12 g-col-md-6 g-col-lg-6">
                    <h3>Special Recognitions for Outstanding Reviews</h3>
                    %s
                </div>
            </div>
            ]], reviews_html, recognitions_html)
    end

    return html
end

return Reviews
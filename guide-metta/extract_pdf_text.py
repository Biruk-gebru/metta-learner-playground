import PyPDF2

with open("MeTTa and OpenCog Hyperon Guide.pdf", "rb") as file:
    reader = PyPDF2.PdfReader(file)
    with open("metta_guide.txt", "w", encoding="utf-8") as out:
        for page in reader.pages:
            text = page.extract_text()
            if text:
                out.write(text + "\n") 
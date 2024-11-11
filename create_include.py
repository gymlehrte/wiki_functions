import os

# Define the path to the /js folder and the output file
js_folder_path = "./js"
output_file = "includes.html"

# Open the output file in write mode
with open(output_file, "w") as file:
    # Loop through all files in the /js folder
    for filename in os.listdir(js_folder_path):
        # Only include JavaScript files
        if filename.endswith(".js"):
            # Create the script tag for each JS file
            script_tag = f'<script src="/static/{filename}"></script>\n'
            # Write the script tag to the output file
            file.write(script_tag)

print(f"Includes file created at {output_file}")

import os

# Define the source and target file paths relative to the location of the script
target_file_path = os.path.join(os.path.dirname(__file__), 'server.ini')
source_file_path = os.path.join(os.path.dirname(__file__), '..', 'server', 'servertest.ini')

# Open the source file for reading
with open(source_file_path, 'r') as source_file:
    # Read the contents of the file
    source_contents = source_file.read()

    # Split the contents into lines
    lines = source_contents.split('\n')

    # Iterate over the lines
    for i, line in enumerate(lines):
        # Split the line into key and value
        key_value = line.split('=')
        if len(key_value) == 2:
            key, value = key_value
        else:
            key = key_value[0]
            value = ''

        # Replace ; with | in the value
        value = value.replace(';', '|')

        # Replace the value in the line
        lines[i] = f'{key}={value}'

# Open the target file for writing
with open(target_file_path, 'w') as target_file:
    # Join the lines back together into a string
    target_contents = '\n'.join(lines)

    # Write the contents to the target file
    target_file.write(target_contents)

print(f'Successfully updated {target_file_path}')
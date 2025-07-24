import re

# Define the string to search in
text = "This is a test string that contains hello world inside."

# Define the regex pattern
pattern = r"\bhello world\b"

# Use re.search to find the match
match = re.search(pattern, text)

# Check and print the result
if match:
    print("✅ Match found:", match.group())
else:
    print("❌ No match found.")

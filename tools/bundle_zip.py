#!/usr/bin/env python
import shutil
zip_name = 'hack-labs'
shutil.make_archive(zip_name, 'zip', 'build/')
print(f'File ./{zip_name}.zip created.')

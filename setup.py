from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in kirby/__init__.py
from kirby import __version__ as version

setup(
	name="kirby",
	version=version,
	description="Kirby Metal Recycling",
	author="Amafhh Infotech",
	author_email="info@amafhhinfotech.in",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)

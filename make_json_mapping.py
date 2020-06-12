#!/usr/bin/env python3

import csv
import json

mapping = {}
rev_map = {}

with open("mapping.txt", "r") as inf:
    reader = csv.reader(inf)
    for row in reader:
        if len(row) > 1:
            key, function = row
            function = function.strip()

            # print(key, "->", function)
            mapping[key] = function
            rev_map[function] = key


def print_mapping():
    for func in sorted(rev_map):
        if len(func) == 1:
            print(func, rev_map[func])

def produce_json_map():
    print(json.dumps(rev_map))

produce_json_map()

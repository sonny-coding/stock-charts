import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";

import Search from "../search/Search";

import React from "react";
import SearchResults from "../search/SearchResults";
import { Button } from "../ui/button";

const SearchDialog = ({ query }: { query: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
          <SearchIcon className="h-5 w-5" />
          <span className="ml-2">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <div className="min-h-[330px] mt-5">
            <Search placeholder="Search companies..." />
            <SearchResults query={query} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
